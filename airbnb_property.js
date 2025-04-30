const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');



async function get_title(page){
    const click_title = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[3]/div/a').elementHandle();
    await click_title.click();
    await page.waitForTimeout(2000);
    let title = await page.locator(".tm2tbis.d16kjnld.dir.dir-ltr");
    let result = await title.textContent();
    return {"Title": result};
}


async function get_property_type(page){
    const click_first = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[4]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, click_first);
    await click_first.click();
    await page.waitForTimeout(2000);
    let most_like = await page.locator('select[name="propertyTypeGroup"] option:checked');
    let most_like_result = await most_like.textContent();
    let property_type = await page.locator('select[name="propertyType"] option:checked');
    let property_type_result = await property_type.textContent();
    let listing_type = await page.locator('select[name="roomType"] option:checked');
    let listing_type_result = await listing_type.textContent();
    let floors = await page.locator('xpath=//*[@id="property-type-totalFloors-stepper-stepper"]/div/span[1]').textContent();
    let flors = await page.locator('xpath=//*[@id="property-type-floorNumber-stepper-stepper"]/div/span[1]').textContent()
    let year_built = await page.locator('input[name="yearBuilt"]').inputValue();
    let property_size = await page.locator('input[name="propertySize"]').inputValue();
    let propertySizeUnits = await page.locator('select[name="propertySizeUnits"] option:checked').textContent();
    // console.log("get_property_type done");
    return {"property_type":{"propertyTypeGroup": most_like_result.trim(),"property_type": property_type_result.trim(), "listing_type": listing_type_result.trim(),"floors_in_the_building" : floors,"floor_is_listing_on":flors,"year_built":year_built,"property_size":property_size,"propertySizeUnits":propertySizeUnits}};
}


async function get_pricing(page){
    let pricing = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[5]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, pricing);
    await pricing.click();
    await page.waitForTimeout(2000);
    let smart_pricing = await page.locator('xpath=//*[@id="pricing-and-availability-settings-sbui.pricing.smart-pricing-switch"]');
    let smart_pricing_result = await smart_pricing.getAttribute('aria-checked');
    let price = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section/section/div/div/div[2]/div[2]/a/div/div/div/div').textContent();
    let weekend_price;
    try{
        weekend_price = await page.locator('xpath=//*[@id="pricing-and-availability-settings-rates-weekend-entrypoint"]/div[2]/div').textContent();
    }catch(error){
        weekend_price = "no detail";
    }
    let weekly_discount = await page.locator('//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]/div/div/div[2]/div[1]').textContent();
    let weekly_discount_average = await page.locator('xpath=//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]/div/div/div[2]/div[2]').textContent();
    let weekly_final = weekly_discount_average.replace(/[^\d₱,]/g, '');
    let month_discount = await page.locator('xpath=//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]/div/div/div[2]/div[1]').textContent();
    let month_discount_average = await page.locator('//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]/div/div/div[2]/div[2]').textContent();
    let month_final = month_discount_average.replace(/[^\d₱,]/g, '');

    return {"pricing": {"smart_pricing":smart_pricing_result,"price":price,"weekend_price":weekend_price,"weekly_discount":weekly_discount,"weekly_discount_average":weekly_final,"month_discount":month_discount,"month_discount_average":month_final}};
}


async function get_availability(page){
    let availability = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[6]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, availability);
    await availability.click();
    //trip lenght
    let minimum_night = await page.locator('xpath=//*[@id="pricing-and-availability-settings-trip-length-min-entrypoint"]/div/div[2]').textContent();
    let maximum_night = await page.locator('//*[@id="pricing-and-availability-settings-trip-length-max-entrypoint"]/div/div[2]').textContent();
    //advance notice
    let advance_notice = await page.locator('xpath=//*[@id="mys-advance-notice-input"]');
    let advance_notice_check = await advance_notice.locator('option:checked');
    let advance_notice_result = await advance_notice_check.textContent();
    let same_day_result = "false";
    if (advance_notice_result == "Same day"){
        let same_day = await page.locator('xpath=//*[@id="mys-sameday-advance-notice-input"]');
        let same_day_check = await same_day.locator('option:checked');
        same_day_result = await same_day_check.textContent();
    }
    let request_less_then_1_day_result;
    try{
        let request_less_then_1_day = await page.locator('//*[@id="pricing-and-availability-settings-advance-notice-rtb-switch"]');
        request_less_then_1_day_result = await request_less_then_1_day.getAttribute('aria-checked');
    }catch{
        request_less_then_1_day_result = "false";
    }
    return {"availability": {"minimum_night": minimum_night,"maximum_night": maximum_night,"advance_notice": advance_notice_result,"same_day": same_day_result,"request_less_then_1_day":request_less_then_1_day_result}};
}


async function get_number_of_guest(page){
    let number_of_guest = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[7]/div/div');
    let result = await number_of_guest.textContent();
    return {"guest": {"guest_count": result}};
}

async function get_description(page){
    let description = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[8]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, description);
    await description.click();

    let listing_des = await page.locator('xpath=//*[@id="listing-summary-row"]/div/div/div');
    let listing_des_result = await listing_des.textContent();
    let your_property = await page.locator('xpath=//*[@id="listing-space-row"]/div/div/div');
    let your_property_result = await your_property.textContent();
    let guest_access = await page.locator('xpath=//*[@id="listing-access-row"]/div/div/div');
    let guest_access_result = await guest_access.textContent();
    let interaction_with_guest = await page.locator('xpath=//*[@id="listing-interaction-row"]/div/div/div');
    let interaction_with_guest_result = await interaction_with_guest.textContent();
    let other_details = await page.locator('xpath=//*[@id="listing-notes-row"]/div/div/div');
    let other_details_result = await other_details.textContent();

    
    return {"description": {"listing_des": listing_des_result,"your_property": your_property_result,"guest_access": guest_access_result,"interaction_with_guest": interaction_with_guest_result,"other_details": other_details_result}};
}
async function get_amenities(page){
    let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    await page.waitForTimeout(2000);
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, amenities);
    await amenities.click();
    await page.waitForTimeout(2000);
    let list_of_amenities = []
    let bodyOfamenities = await page.locator('.crxq8ue.dir.dir-ltr');
    let amenitiess = await bodyOfamenities.locator('.twad414.dir.dir-ltr').count();
    // console.log("amenities count", amenitiess);
    for (let i = 0; i < amenitiess; i++) {
        let amenities_result = await bodyOfamenities.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        await bodyOfamenities.evaluate((element) => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, amenities_result);
        let amenities_result_text = await amenities_result.textContent();
        let final_amenities_result_text = amenities_result_text.replace(/\s+/g, '_');
        // console.log(final_amenities_result_text);
        list_of_amenities.push(final_amenities_result_text);
    }
    try {
        let data = await fs.readFileSync('amenities.json', { encoding: 'utf8' });
        let amenities = JSON.parse(data);

        
        let result = { ...amenities };

        list_of_amenities.forEach(item => {
            result[item] = true;
        });

        return { amenities: result };
    } catch (err) {
        console.error('Failed to read amenities.json:', err);
        return { error: 'Could not load amenities.json' };
    }
    

    // async function get_amenities(page){
    //     let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    //     await page.waitForTimeout(2000);
    //     await page.evaluate((element) => {
    //         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }, amenities);
    //     await amenities.click();
    //     await page.waitForTimeout(2000);
    //     let list_of_amenities = []
        
    //     let amenitiess = await page.locator('.twad414.dir.dir-ltr').count();
    //     console.log("amenities count", amenitiess);
    //     let amenities2_result_text = "";
    //     for (let i = 8; i < amenitiess; i++) {
    //         let amenities_result = await page.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
    //         let amenities_result_text = await amenities_result.textContent();
    //         try{
    //             let amenities2_result = await page.locator('.s9gst5p.dir.dir-ltr').nth(i-8).elementHandle();
    //             amenities2_result_text = await amenities2_result.textContent();
    //             list_of_amenities.push(`${amenities_result_text} : ${amenities2_result_text}`);
    //         }
    //         catch(error){
    //             list_of_amenities.push(amenities_result_text);
    //         }
    //         console.log("amenities result", list_of_amenities);
    //     }
    //     return {"amenities": {'list': list_of_amenities}};
    // }
}
async function get_accessibility(page){
    let accessibility = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[10]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, accessibility);
    // await accessibility.click();

}
async function get_location(page){
    let location = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[11]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, location);
    await page.waitForTimeout(5000);
    await location.click();
    await page.waitForTimeout(5000);
    let bodyOfLocation = await page.locator('.b1wc4zxq.dir.dir-ltr');
    let address =  await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(0).elementHandle();
    await address.click();
    
    let unit_level = await page.locator('input[name="APT"]').inputValue();
    let building_name = await page.locator('input[name="ADDITIONALINFO"]').inputValue();
    let street_address = await page.locator('xpath=//*[@id="STREET"]').inputValue();
    let brgy_district = await page.locator('input[name="DISTRICT"]').inputValue();
    let city_municipality = await page.locator('input[name="CITY"]').inputValue();
    let postal_code = await page.locator('input[name="ZIPCODE"]').inputValue();
    let province = await page.locator('input[name="STATE"]').inputValue();
    let address_result = {
        'unit_level': unit_level,
        'building_name': building_name,
        'street_address': street_address,
        'brgy_district': brgy_district,
        'city_municipality': city_municipality,
        'postal_code': postal_code,
        'province': province
    };
    let location_sharing = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(1);
    await page.waitForTimeout(5000);
    await location_sharing.click({ force: true });
    let location_sharing_result = []
    let bodyOfSpecific = await page.locator('.c5bpt99.dir.dir-ltr');
    // await page.screenshot({ path: 'screenshot.png', fullPage: true });
    let specific_location = await bodyOfSpecific.locator('xpath=//*[@id="secondaryPanelForm"]/div[1]/div[1]/div[2]/button');
    await page.waitForTimeout(5000);
    let specific_location_result = await specific_location.getAttribute('aria-checked');
    location_sharing_result.push({"specific_location": specific_location_result});
    let address_for_cancellation = await bodyOfSpecific.locator('xpath=//*[@id="switch-address-privacy-for-cancellations-switch-row-id"]');
    let address_for_cancellation_result = await address_for_cancellation.getAttribute('aria-checked');
    location_sharing_result.push({"address_for_cancellation": address_for_cancellation_result});
    let location_sharing_result_final = Object.assign({}, ...location_sharing_result);

    let location_feature = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(2).elementHandle();
    await location_feature.click();
    await page.waitForTimeout(5000);
    let bodyOffeatures = await page.locator('.b1sjcma8.dir.dir-ltr');
    let loopfor  = await bodyOffeatures.locator('.twad414.dir.dir-ltr').count();
    // console.log(loopfor);
    let location_feature_result = [];
    for (let i = 0; i < loopfor; i++) {
        let location_feature_result_text = await bodyOffeatures.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await bodyOffeatures.locator('.canm9xs').nth(i).elementHandle();
        let result = await trueOrfalse.getAttribute('aria-checked');
        location_feature_result.push({[(await location_feature_result_text.textContent()).replace(/\s+/g, '_')]: result});
    }
    let location_feature_result_final = Object.assign({}, ...location_feature_result);

    await page.waitForTimeout(5000);
    let neighnorhood = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(3).elementHandle();
    await page.waitForTimeout(5000);
    await neighnorhood.click();
    let neighnorhood_result = await page.locator('xpath=//*[@id="description-input"]').textContent();

    
    let scenic_view = await bodyOfLocation.locator('xpath=//*[@id="listing-location-scenic-views-row"]/div/div/button').elementHandle();
    await page.waitForTimeout(5000);
    await scenic_view.click({ force: true });
    let scenic_view_body = await page.locator('.b1sjcma8.dir.dir-ltr');
    let loopfor2  = await scenic_view_body.locator('.twad414.dir.dir-ltr').count();
    let scenic_view_result = [];
    for (let i = 0; i < loopfor2; i++) {
        let scenic_view_result_text = await scenic_view_body.locator('.twad414.dir.dir-ltr').nth(i).elementHandle();
        let trueOrfalse = await page.locator('.c1dz1hqo.dir.dir-ltr').nth(i).isChecked();
        scenic_view_result.push({[(await scenic_view_result_text.textContent()).replace(/\s+/g, '_')]: trueOrfalse});
    }
    let scenic_view_result_text_final = Object.assign({}, ...scenic_view_result);

    let getting_around = await bodyOfLocation.locator('.l1ovpqvx.e1f9gr0o.dir.dir-ltr').nth(4).elementHandle();
    await page.waitForTimeout(5000);
    await getting_around.click();
    let getting_around_result = await page.locator('xpath=//*[@id="description-input"]').textContent();

    

    await page.waitForTimeout(2000);

    return {"location": {"address_result":address_result,"location_sharing": location_sharing_result_final,"location_feature": location_feature_result_final,"neighnorhood": neighnorhood_result,"getting_around": getting_around_result,"scenic_view": scenic_view_result_text_final}};

}
// async function get_about_host(page){
//     let about_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[12]/div/a').elementHandle();
//     await page.evaluate((element) => {
//         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }, about_host);
//     return {"about_host": 'result'};
// }
// async function get_co_host(page){
//     let co_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[13]/div/a').elementHandle();
//     await page.evaluate((element) => {
//         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }, co_host);
//     return {"co_host": 'result'};
// }
async function get_booking_setting(page){
    let booking_setting = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[14]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, booking_setting);
    await booking_setting.click();
    let checkedRadio = await page.locator('input[name="booking-settings-chip-group"]:checked');

    let useInstantBook = await checkedRadio.locator('xpath=ancestor::label').innerText();

    if (useInstantBook.includes('Use Instant Book')) {
        let title = "Use Instant Book"

        let trackRecordSwitch = await page.locator('#switch-switch-row-trailing-unpadded-variation-default');
        let trackRecordChecked = await trackRecordSwitch.getAttribute('aria-checked');

        let customMsgSection = await page.locator('xpath=//*[@id="booking-settings-chip-group"]/label[1]/div[2]/div/div[3]/button');
        await customMsgSection.click();
        await page.waitForTimeout(2000);
        let customMsgText = await page.locator('xpath=//*[@id="welcome-message-textarea"]');
        let customMsgTextValue = await customMsgText.textContent();
        return {"booking_setting": {"title": title, "trackRecordChecked": trackRecordChecked, "customMsgTextValue": customMsgTextValue}};
    }
    else if (useInstantBook.includes('Approve your first 5 bookings')) {
        let title = "Approve your first 5 bookings"
        return {"booking_setting": {"title": title}};
    }
    else{
        let title = "Approve all bookings"
        return {"booking_setting": {"title": title}};
    }
}

async function get_house_rules(page){
    let house_rules = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, house_rules);
    await house_rules.click();
    let petsAllowedResultText;
    try{
        let petsAllowed = await page.locator('xpath=//*[@id="num-pets-house-rules-stepper-stepper"]');
        let petsAllowedResult = await petsAllowed.textContent();
        petsAllowedResultText = petsAllowedResult.replace(/[^0-9]/g, '');
    }
    catch{
        petsAllowedResultText = "0";
    }
    let eventsallowed_result;
    let eventsallowed = await page.locator('input[name="events-allowed-toggle-row-row-toggle-DLS-toggle-group-name"]:checked');
    try{
        eventsallowed_result = await eventsallowed.inputValue();
    }
    catch(error){
        eventsallowed_result = "false";
    }
    let smoking_allowed = await page.locator('input[name="smoking-allowed-toggle-row-row-toggle-DLS-toggle-group-name"]:checked');
    let smoking_allowed_result;
    try{
        smoking_allowed_result = await smoking_allowed.inputValue();
    }
    catch(error){
        smoking_allowed_result = "false";
    }
    let quiet_hours_final;
    try{
        let quiet_hours_start = await page.locator('select[name="quietHoursStartTime"] option:checked');
        let quiet_hours_start_result = await quiet_hours_start.textContent();
        let quiet_hours_end = await page.locator('select[name="quietHoursEndTime"] option:checked');
        let quiet_hours_end_result = await quiet_hours_end.textContent();
        quiet_hours_final = {"quiet_hours_start": quiet_hours_start_result, "quiet_hours_end": quiet_hours_end_result};
    }
    catch{
        quiet_hours_final = "false";
    }

    let commercial_photography = await page.locator('input[name="commercial-photography-toggle-row-row-toggle-DLS-toggle-group-name"]:checked');
    let commercial_photography_result;
    try{
        commercial_photography_result = await commercial_photography.inputValue();
    }
    catch(error){
        commercial_photography_result = "false";
    }

    let number_of_guest = await page.locator('xpath=//*[@id="person-capacity-house-rules-stepper-stepper"]/div/span[1]');
    let number_of_guest_result = await number_of_guest.textContent();

    let Check_in_and_out = await page.locator('xpath=//*[@id="main-panel-content"]/div[7]/div/button');
    await page.waitForTimeout(2000);
    await Check_in_and_out.click();
    let start_time_result;
    let end_time_result;
    let check_out_result;
    try{
        let start_time = await page.locator('select[id="check-in-start-time"] option:checked');
        start_time_result = await start_time.textContent();
    }catch(error){
        start_time_result = "false";
    }
    
    try{
        let end_time = await page.locator('select[id="check-in-end-time"] option:checked');
        end_time_result = await end_time.textContent();
    }catch(error){
        end_time_result = "false";
    }
    try{
        let check_out = await page.locator('select[id="check-out-time"] option:checked');
        check_out_result = await check_out.textContent();
    }catch(error){
        check_out_result = "false";
    }

    let check_in_and_out_result = {"start_time": start_time_result, "end_time": end_time_result, "check_out": check_out_result};

    let addtional_rules = await page.locator('xpath=//*[@id="main-panel-content"]/div[8]/div/button');
    await page.waitForTimeout(2000);
    await addtional_rules.click();
    let addtional_rules_result = await page.locator('xpath=//*[@id="additional-rules-textarea"]').textContent();
    
    return {"house_rules": {
        "petsAllowed": petsAllowedResultText,
        "eventsallowed": eventsallowed_result,
        "smoking_allowed": smoking_allowed_result,
        "quiet_hours": quiet_hours_final,
        "commercial_photography": commercial_photography_result,
        "number_of_guest": number_of_guest_result,
        "check_in_and_out": check_in_and_out_result,
        "addtional_rules": addtional_rules_result
    }};
}
async function get_guest_safety(page){
    let guest_safety = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[16]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, guest_safety);
    await guest_safety.click();
    let safety_considerations = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[1]/button');
    await page.waitForTimeout(2000);
    await safety_considerations.click();
    await page.waitForTimeout(2000);

    let safety_considerations_list = []

    let not_a_good_fit_for_children_2_12_result;
    let not_a_good_fit_for_children_2_12_result_text = "";
    try{
        let not_a_good_fit_for_children_2_12 = await page.locator('input[name="HOUSE_RULE_NO_CHILDREN_ALLOWED-row-toggle-DLS-toggle-group-name"]:checked');
        not_a_good_fit_for_children_2_12_result = await not_a_good_fit_for_children_2_12.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(0);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                not_a_good_fit_for_children_2_12_result_text = await body_details_text.textContent();
            }catch(error){
                not_a_good_fit_for_children_2_12_result_text = "no detail";
            }
            safety_considerations_list.push({"not_a_good_fit_for_children_2_12": not_a_good_fit_for_children_2_12_result, "not_a_good_fit_for_children_2_12_result_detail": not_a_good_fit_for_children_2_12_result_text.replace(/"/g, '')});
        }
        else{
            not_a_good_fit_for_children_2_12_result = "false";
            safety_considerations_list.push({"not_a_good_fit_for_children_2_12": not_a_good_fit_for_children_2_12_result});
        }
    }catch(error){
        not_a_good_fit_for_children_2_12_result = "false";
        safety_considerations_list.push({"not_a_good_fit_for_children_2_12": not_a_good_fit_for_children_2_12_result});
    }
    


    let not_a_good_fit_for_infats_under_2_result;
    let not_a_good_fit_for_infats_under_2_result_text = "";
    try{
        let not_a_good_fit_for_infats_under_2 = await page.locator('input[name="HOUSE_RULE_NO_INFANTS_ALLOWED-row-toggle-DLS-toggle-group-name"]:checked');
        not_a_good_fit_for_infats_under_2_result = await not_a_good_fit_for_infats_under_2.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(1);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                not_a_good_fit_for_infats_under_2_result_text = await body_details_text.textContent();
                
            }catch(error){
                not_a_good_fit_for_infats_under_2_result_text = "no detail";
            }
            safety_considerations_list.push({"not_a_good_fit_for_infats_under_2": not_a_good_fit_for_infats_under_2_result, "not_a_good_fit_for_infats_under_2_result_detail": not_a_good_fit_for_infats_under_2_result_text.replace(/"/g, '')});
        }
        else{
            not_a_good_fit_for_infats_under_2_result = "false";
            safety_considerations_list.push({"not_a_good_fit_for_infats_under_2": not_a_good_fit_for_infats_under_2_result});
        }
    }catch(error){
        not_a_good_fit_for_infats_under_2_result = "false";
        safety_considerations_list.push({"not_a_good_fit_for_infats_under_2": not_a_good_fit_for_infats_under_2_result});
    }


    let Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result;
    let Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_text = "";
    try{
        let Pool_or_hot_tub_doesnt_have_a_gate_or_lock = await page.locator('input[name="EXPECTATION_POOL_OR_JACUZZI_WITH_NO_FENCE-row-toggle-DLS-toggle-group-name"]:checked');
        Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result = await Pool_or_hot_tub_doesnt_have_a_gate_or_lock.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(2);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_text = await body_details_text.textContent();
            }catch(error){
                Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_text = "no detail";
            }
            safety_considerations_list.push({"pool_or_hot_tub_doesnt_have_a_gate_or_lock": Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result, "pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_detail": Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result_text.replace(/"/g, '')});
        }
        else{
            Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result = "false";
            safety_considerations_list.push({"pool_or_hot_tub_doesnt_have_a_gate_or_lock": Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result});
        }
    }catch(error){
        Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result = "false";
        safety_considerations_list.push({"pool_or_hot_tub_doesnt_have_a_gate_or_lock": Pool_or_hot_tub_doesnt_have_a_gate_or_lock_result});
    }


    let nearby_water_like_lake_or_river_result;
    let nearby_water_like_lake_or_river_result_text = "";
    try{
        let nearby_water_like_lake_or_river = await page.locator('input[name="EXPECTATION_LAKE_OR_RIVER_OR_WATER_BODY-row-toggle-DLS-toggle-group-name"]:checked');
        nearby_water_like_lake_or_river_result = await nearby_water_like_lake_or_river.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(3);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                nearby_water_like_lake_or_river_result_text = await body_details_text.textContent();
            }catch(error){
                nearby_water_like_lake_or_river_result_text = "no detail";
            }
            safety_considerations_list.push({"nearby_water_like_lake_or_river": nearby_water_like_lake_or_river_result, "nearby_water_like_lake_or_river_result_detail": nearby_water_like_lake_or_river_result_text.replace(/"/g, '')});
        }
        else{
            nearby_water_like_lake_or_river_result = "false";
            safety_considerations_list.push({"nearby_water_like_lake_or_river": nearby_water_like_lake_or_river_result});
        }
    }catch(error){
        nearby_water_like_lake_or_river_result = "false";
        safety_considerations_list.push({"nearby_water_like_lake_or_river": nearby_water_like_lake_or_river_result});
    }


    let climbing_or_play_result;
    let climbing_or_play_result_text = "";
    try{
        let climbing_or_play = await page.locator('input[name="EXPECTATION_CLIMBING_OR_PLAY_STRUCTURE-row-toggle-DLS-toggle-group-name"]:checked');
        climbing_or_play_result = await climbing_or_play.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(4);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                climbing_or_play_result_text = await body_details_text.textContent();
            }catch(error){
                climbing_or_play_result_text = "no detail";
            }
            safety_considerations_list.push({"climbing_or_play": climbing_or_play_result, "climbing_or_play_result_detail": climbing_or_play_result_text.replace(/"/g, '')});
        }
        else{
            climbing_or_play_result = "false";
            safety_considerations_list.push({"climbing_or_play": climbing_or_play_result});
        }
    }catch(error){
        climbing_or_play_result = "false";
        safety_considerations_list.push({"climbing_or_play": climbing_or_play_result});
    }


    let heights_without_rails_or_protection_result;
    let heights_without_rails_or_protection_result_text = "";
    try{
        let heights_without_rails_or_protection = await page.locator('input[name="EXPECTATION_HEIGHTS_WITH_NO_FENCE-row-toggle-DLS-toggle-group-name"]:checked');
        heights_without_rails_or_protection_result = await heights_without_rails_or_protection.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(5);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                heights_without_rails_or_protection_result_text = await body_details_text.textContent();
            }catch(error){
                heights_without_rails_or_protection_result_text = "no detail";
            }
            safety_considerations_list.push({"heights_without_rails_or_protection": heights_without_rails_or_protection_result, "heights_without_rails_or_protection_result_detail": heights_without_rails_or_protection_result_text.replace(/"/g, '')});
        }
        else{
            heights_without_rails_or_protection_result = "false";
            safety_considerations_list.push({"heights_without_rails_or_protection": heights_without_rails_or_protection_result});
        }
    }catch(error){
        heights_without_rails_or_protection_result = "false";
        safety_considerations_list.push({"heights_without_rails_or_protection": heights_without_rails_or_protection_result});
    }

    
    let potential_dangerous_animals_on_the_property_result;
    let potential_dangerous_animals_on_the_property_result_text = "";
    try{
        let potential_dangerous_animals_on_the_property = await page.locator('input[name="EXPECTATION_ANIMALS-row-toggle-DLS-toggle-group-name"]:checked');
        potential_dangerous_animals_on_the_property_result = await potential_dangerous_animals_on_the_property.inputValue();
        if(not_a_good_fit_for_children_2_12_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(6);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                potential_dangerous_animals_on_the_property_result_text = await body_details_text.textContent();
            }catch(error){
                potential_dangerous_animals_on_the_property_result_text = "no detail";
            }
            safety_considerations_list.push({"potential_dangerous_animals_on_the_property": potential_dangerous_animals_on_the_property_result, "potential_dangerous_animals_on_the_property_result_detail": potential_dangerous_animals_on_the_property_result_text.replace(/"/g, '')});
        }
        else{
            potential_dangerous_animals_on_the_property_result = "false";
            safety_considerations_list.push({"potential_dangerous_animals_on_the_property": potential_dangerous_animals_on_the_property_result});
        }
    }catch(error){
        potential_dangerous_animals_on_the_property_result = "false";
        safety_considerations_list.push({"potential_dangerous_animals_on_the_property": potential_dangerous_animals_on_the_property_result});
    }

    let safety_devices_list = []
    let safety_devices = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/button');
    await page.waitForTimeout(2000);
    await safety_devices.click();


    let Exterior_security_camera_present_result;
    let Exterior_security_camera_present_result_text = "";
    try{
        let Exterior_security_camera_present = await page.locator('input[name="EXPECTATION_SURVEILLANCE-row-toggle-DLS-toggle-group-name"]:checked');
        Exterior_security_camera_present_result = await Exterior_security_camera_present.inputValue();
        if(Exterior_security_camera_present_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(0);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Exterior_security_camera_present_result_text = await body_details_text.textContent();
            }catch(error){
                Exterior_security_camera_present_result_text = "no detail";
            }
            safety_devices_list.push({"exterior_security_camera_present": Exterior_security_camera_present_result, "exterior_security_camera_present_result_detail": Exterior_security_camera_present_result_text.replace(/"/g, '')});
        }
        else{
            Exterior_security_camera_present_result = "false";
            safety_devices_list.push({"exterior_security_camera_present": Exterior_security_camera_present_result});
        }
    }catch(error){
        Exterior_security_camera_present_result = "false";
        safety_devices_list.push({"exterior_security_camera_present": Exterior_security_camera_present_result});
    }


    let Noise_decibel_monitor_present_result;
    let Noise_decibel_monitor_present_result_text = "";
    try{
        let Noise_decibel_monitor_present = await page.locator('input[name="EXPECTATION_NOISE_MONITOR-row-toggle-DLS-toggle-group-name"]:checked');
        Noise_decibel_monitor_present_result = await Noise_decibel_monitor_present.inputValue();
        if(Noise_decibel_monitor_present_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(1);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Noise_decibel_monitor_present_result_text = await body_details_text.textContent();
            }catch(error){
                Noise_decibel_monitor_present_result_text = "no detail";
            }
            safety_devices_list.push({"noise_decibel_monitor_present": Noise_decibel_monitor_present_result, "noise_decibel_monitor_present_result_detail": Noise_decibel_monitor_present_result_text.replace(/"/g, '')});
        }else{
            Noise_decibel_monitor_present_result = "false";
            safety_devices_list.push({"noise_decibel_monitor_present": Noise_decibel_monitor_present_result});
        }
    }catch(error){
        Noise_decibel_monitor_present_result = "false";
        safety_devices_list.push({"noise_decibel_monitor_present": Noise_decibel_monitor_present_result});
    }


    let Carbon_monoxide_alarm_result;
    let Carbon_monoxide_alarm_result_text = "";
    try{
        let Carbon_monoxide_alarm = await page.locator('input[name="AMENITY_CARBON_MONOXIDE_DETECTOR-row-toggle-DLS-toggle-group-name"]:checked');
        Carbon_monoxide_alarm_result = await Carbon_monoxide_alarm.inputValue();
        if(Carbon_monoxide_alarm_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(2);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Carbon_monoxide_alarm_result_text = await body_details_text.textContent();
            }catch(error){
                Carbon_monoxide_alarm_result_text = "no detail";
            }
            safety_devices_list.push({"carbon_monoxide_alarm": Carbon_monoxide_alarm_result, "carbon_monoxide_alarm_result_detail": Carbon_monoxide_alarm_result_text.replace(/"/g, '')});
        }
        else{
            Carbon_monoxide_alarm_result = "false";
            safety_devices_list.push({"carbon_monoxide_alarm": Carbon_monoxide_alarm_result});
        }
    }catch(error){
        Carbon_monoxide_alarm_result = "false";
        safety_devices_list.push({"carbon_monoxide_alarm": Carbon_monoxide_alarm_result});
    }


    let Smoke_alarm_result;
    let Smoke_alarm_result_text = "";
    try{
        let Smoke_alarm = await page.locator('input[name="AMENITY_SMOKE_DETECTOR-row-toggle-DLS-toggle-group-name"]:checked');
        Smoke_alarm_result = await Smoke_alarm.inputValue();
        if(Smoke_alarm_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(2);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Smoke_alarm_result_text = await body_details_text.textContent();
            }catch(error){
                Smoke_alarm_result_text = "no detail";
            }
            safety_devices_list.push({"smoke_alarm": Smoke_alarm_result, "smoke_alarm_result_detail": Smoke_alarm_result_text.replace(/"/g, '')});
        }else{
            Smoke_alarm_result = "false";
            safety_devices_list.push({"smoke_alarm": Smoke_alarm_result});
        }
    }catch(error){
        Smoke_alarm_result = "false";
        safety_devices_list.push({"smoke_alarm": Smoke_alarm_result});
    }


    let propert_info = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[3]/button');
    await page.waitForTimeout(2000);
    await propert_info.click();

    let propert_info_list = []


    let Guests_must_climb_stairs_result;
    let Guests_must_climb_stairs_result_text = "";
    try{
        let Guests_must_climb_stairs = await page.locator('input[name="EXPECTATION_REQUIRES_STAIRS-row-toggle-DLS-toggle-group-name"]:checked');
        Guests_must_climb_stairs_result = await Guests_must_climb_stairs.inputValue();
        if(Guests_must_climb_stairs_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(0);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Guests_must_climb_stairs_result_text = await body_details_text.textContent();
            }catch(error){
                Guests_must_climb_stairs_result_text = "no detail";
            }
            propert_info_list.push({"guests_must_climb_stairs": Guests_must_climb_stairs_result, "guests_must_climb_stairs_result_detail": Guests_must_climb_stairs_result_text.replace(/"/g, '')});
        }else{
            Guests_must_climb_stairs_result = "false";
            propert_info_list.push({"guests_must_climb_stairs": Guests_must_climb_stairs_result});
        }
    }catch(error){
        Guests_must_climb_stairs_result = "false";
        propert_info_list.push({"guests_must_climb_stairs": Guests_must_climb_stairs_result});
    }


    let Potential_noise_during_stays_result;
    let Potential_noise_during_stays_result_text = "";
    try{
        let Potential_noise_during_stays = await page.locator('input[name="EXPECTATION_POTENTIAL_NOISE-row-toggle-DLS-toggle-group-name"]:checked');
        Potential_noise_during_stays_result = await Potential_noise_during_stays.inputValue();
        if(Potential_noise_during_stays_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(1);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Potential_noise_during_stays_result_text = await body_details_text.textContent();
            }catch(error){
                Potential_noise_during_stays_result_text = "no detail";
            }
            propert_info_list.push({"potential_noise_during_stays": Potential_noise_during_stays_result, "Potential_noise_during_stays_result_detail": Potential_noise_during_stays_result_text.replace(/"/g, '')});
        }else{
            Potential_noise_during_stays_result = "false";
            propert_info_list.push({"potential_noise_during_stays": Potential_noise_during_stays_result});
        }
    }catch(error){
        Potential_noise_during_stays_result = "false";
        propert_info_list.push({"potential_noise_during_stays": Potential_noise_during_stays_result});
    }


    let Pet_live_at_the_property_result;
    let Pet_live_at_the_property_result_text = "";
    try{
        let Pet_live_at_the_property = await page.locator('input[name="EXPECTATION_HAS_PETS-row-toggle-DLS-toggle-group-name"]:checked');
        Pet_live_at_the_property_result = await Pet_live_at_the_property.inputValue();
        if(Pet_live_at_the_property_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(2);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Pet_live_at_the_property_result_text = await body_details_text.textContent();
            }catch(error){
                Pet_live_at_the_property_result_text = "no detail";
            }
            propert_info_list.push({"pet_live_at_the_property": Pet_live_at_the_property_result, "Pet_live_at_the_property_result_detail": Pet_live_at_the_property_result_text.replace(/"/g, '')});
        }else{
            Pet_live_at_the_property_result = "false";
            propert_info_list.push({"pet_live_at_the_property": Pet_live_at_the_property_result});
        }
    }catch(error){
        Pet_live_at_the_property_result = "false";
        propert_info_list.push({"pet_live_at_the_property": Pet_live_at_the_property_result});
    }


    let No_parking_on_the_property_result;
    let No_parking_on_the_property_result_text = "";
    try{
        let No_parking_on_the_property = await page.locator('input[name="EXPECTATION_LIMITED_PARKING-row-toggle-DLS-toggle-group-name"]:checked');
        No_parking_on_the_property_result = await No_parking_on_the_property.inputValue();
        if(No_parking_on_the_property_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(3);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                No_parking_on_the_property_result_text = await body_details_text.textContent();
            }catch(error){
                No_parking_on_the_property_result_text = "no detail";
            }
            propert_info_list.push({"no_parking_on_the_property": No_parking_on_the_property_result, "no_parking_on_the_property_result_detail": No_parking_on_the_property_result_text.replace(/"/g, '')});
        }else{
            No_parking_on_the_property_result = "false";
            propert_info_list.push({"no_parking_on_the_property": No_parking_on_the_property_result});
        }
    }catch(error){
        No_parking_on_the_property_result = "false";
        propert_info_list.push({"no_parking_on_the_property": No_parking_on_the_property_result});
    }


    let Property_has_shared_spaces_result;
    let Property_has_shared_spaces_result_text = "";
    try{
        let Property_has_shared_spaces = await page.locator('input[name="EXPECTATION_SHARED_SPACES-row-toggle-DLS-toggle-group-name"]:checked');
        Property_has_shared_spaces_result = await Property_has_shared_spaces.inputValue();
        if(Property_has_shared_spaces_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(4);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Property_has_shared_spaces_result_text = await body_details_text.textContent();
            }catch(error){
                Property_has_shared_spaces_result_text = "no detail";
            }
            propert_info_list.push({"property_has_shared_spaces": Property_has_shared_spaces_result, "property_has_shared_spaces_result_detail": Property_has_shared_spaces_result_text.replace(/"/g, '')});
        }else{
            Property_has_shared_spaces_result = "false";
            propert_info_list.push({"property_has_shared_spaces": Property_has_shared_spaces_result});
        }
    }catch(error){
        Property_has_shared_spaces_result = "false";
        propert_info_list.push({"property_has_shared_spaces": Property_has_shared_spaces_result});
    }


    let Limited_essential_amenities_result;
    let Limited_essential_amenities_result_text = "";
    try{
        let Limited_essential_amenities = await page.locator('input[name="EXPECTATION_LIMITED_AMENITIES-row-toggle-DLS-toggle-group-name"]:checked');
        Limited_essential_amenities_result = await Limited_essential_amenities.inputValue();
        if(Limited_essential_amenities_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(5);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Limited_essential_amenities_result_text = await body_details_text.textContent();
            }catch(error){
                Limited_essential_amenities_result_text = "no detail";
            }
            propert_info_list.push({"limited_essential_amenities": Limited_essential_amenities_result, "limited_essential_amenities_result_detail": Limited_essential_amenities_result_text.replace(/"/g, '')});
        }else{
            Limited_essential_amenities_result = "false";
            propert_info_list.push({"limited_essential_amenities": Limited_essential_amenities_result});
        }
    }catch(error){
        Limited_essential_amenities_result = "false";
        propert_info_list.push({"limited_essential_amenities": Limited_essential_amenities_result});
    }


    let Weapon_on_the_property_result;
    let Weapon_on_the_property_result_text = "";
    try{
        let Weapon_on_the_property = await page.locator('input[name="EXPECTATION_WEAPONS-row-toggle-DLS-toggle-group-name"]:checked');
        Weapon_on_the_property_result = await Weapon_on_the_property.inputValue();
        if(Weapon_on_the_property_result == "true"){
            try{
                let body_details = await page.locator('.r1nl0foy.dir.dir-ltr').nth(6);
                let body_details_text = await body_details.locator('.s1klrg59.dir.dir-ltr');
                Weapon_on_the_property_result_text = await body_details_text.textContent();
            }catch(error){
                Weapon_on_the_property_result_text = "no detail";
            }
            propert_info_list.push({"weapon_on_the_property": Weapon_on_the_property_result, "weapon_on_the_property_result_detail": Weapon_on_the_property_result_text.replace(/"/g, '')});
        }else{
            Weapon_on_the_property_result = "false";
            propert_info_list.push({"weapon_on_the_property": Weapon_on_the_property_result});
        }
    }catch(error){
        Weapon_on_the_property_result = "false";
        propert_info_list.push({"weapon_on_the_property": Weapon_on_the_property_result});
    }



    let final_result_list = [];
    final_result_list.push({"propert_info": Object.assign({}, ...propert_info_list)});
    final_result_list.push({"safety_considerations": Object.assign({}, ...safety_considerations_list)});
    final_result_list.push({"safety_devices": Object.assign({}, ...safety_devices_list)});
    let final_result = Object.assign({}, ...final_result_list);
    return {"guest_safety": final_result};
}


async function get_cancellation_policy(page){
    let cancellation_policy = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[17]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, cancellation_policy);
    await cancellation_policy.click();
    await page.waitForTimeout(2000);

    let short_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div/div[3]/div/div/div[2]/a');
    await short_term_stays.click();
    await page.waitForTimeout(2000);
    let shorttitle_result;
    let shortdescription_result = {};
    for(let i = 0; i < 4; i++){
        try{
        let bodyOfcancellation = await page.locator('.cs80f52.dir.dir-ltr').nth(i);
        let shortSelected = await bodyOfcancellation.locator('input[name="standard-cancellation-policy-chip-group"]:checked');
        if(await shortSelected.inputValue() == "on"){
            let shorttitle = await page.locator('.tclgsr9.dir.dir-ltr').nth(i);
            shorttitle_result = await shorttitle.textContent();
            let shortdescription1 = await bodyOfcancellation.locator('.s1qynulj.dir.dir-ltr').nth(0);
            let shortdescription1_result = await shortdescription1.textContent();
            let shortdescription2 = await bodyOfcancellation.locator('.s1qynulj.dir.dir-ltr').nth(1);
            let shortdescription2_result = await shortdescription2.textContent();
            shortdescription_result = shortdescription1_result+' , '+shortdescription2_result;
            break;
        }
    }
    catch(error){
        continue
    }
    }
    
    

    let non_refundable_option = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/section/div/div[4]/div/div/div[2]/button');
    let non_refundable_option_result = await non_refundable_option.getAttribute('aria-checked');
    let short_term_stays_final_result = {"title": shorttitle_result, "description": shortdescription_result, "non_refundable_option": non_refundable_option_result};
    // console.log(short_term_stays_final_result);


    let long_term_stays = await page.locator('xpath=//*[@id="site-content"]/div/div[2]/div/section[1]/section/div/div/div[2]/div[2]/div/div/div[2]/a');
    await long_term_stays.click();
    await page.waitForTimeout(2000);
    let longdescription_result = {};
    let title_result;
    for(let i = 0; i < 2; i++){
        try{
            let bodyOfcancellation = await page.locator('.cs80f52.dir.dir-ltr').nth(i);
            let longSelected = await bodyOfcancellation.locator('input[name="long-term-cancellation-policy-chip-group"]:checked');
            if(await longSelected.inputValue() == "on"){
                let longtitle = await page.locator('.tclgsr9.dir.dir-ltr').nth(i);;
                title_result = await longtitle.textContent();
                let shortdescription1 = await bodyOfcancellation.locator('.s1qynulj.dir.dir-ltr').nth(0);
                let shortdescription1_result = await shortdescription1.textContent();
                let shortdescription2 = await bodyOfcancellation.locator('.s1qynulj.dir.dir-ltr').nth(1);
                let shortdescription2_result = await shortdescription2.textContent();
                longdescription_result = shortdescription1_result+' , '+shortdescription2_result;
                // console.log(longdescription_result);
                break;
                }
            }
        catch(error){
            continue;
            }
        }

    let long_term_stays_final_result = {"title": title_result, "description": longdescription_result};
    return {"cancellation_policy": {"short_term_stays": short_term_stays_final_result, "long_term_stays": long_term_stays_final_result}};
}



async function get_custom_link(page){
    let custom_link = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[18]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, custom_link);
    await custom_link.click();
    await page.waitForTimeout(2000);
    let custom_link_ = await page.locator('xpath=//*[@id="custom-link-textarea"]');
    let custom_link_result = await custom_link_.textContent();
    return {"custom_link": custom_link_result};
}

async function scraper_main(functionName,url){
    // let scraper = [
    //     'get_title', 'get_property_type', 'get_pricing','get_availability','get_number_of_guest', 
    //      'get_description', 'get_amenities', 
    //     'get_location', 'get_booking_setting', 
    //     'get_house_rules', 'get_guest_safety','get_cancellation_policy', 'get_custom_link'
    // ]
    // get_cancellation_policy
    // let scraper = [ 'get_custom_link'    ]
    let results = await Promise.all(functionName.map(fn => main(fn,url)));
    let result_final = Object.assign({}, ...results);
    fs.writeFileSync('airbnb_output.json', JSON.stringify(result_final, null, 2));
    return {"Result":result_final};
}

async function main(functionKey,url){
    try{
    const functionName = {
        'get_title': get_title,
        'get_property_type': get_property_type,
        'get_pricing': get_pricing,
        'get_number_of_guest': get_number_of_guest,
        'get_availability': get_availability,
        'get_description': get_description,
        'get_amenities': get_amenities,
        'get_accessibility': get_accessibility,
        'get_location': get_location,
        // 'get_about_host': get_about_host,
        // 'get_co_host': get_co_host,
        'get_booking_setting': get_booking_setting,
        'get_house_rules': get_house_rules,
        'get_guest_safety': get_guest_safety,
        'get_cancellation_policy': get_cancellation_policy,
        'get_custom_link': get_custom_link
    }
    const browser = await chromium.launch({ headless: true,args: ['--start-maximized','--no-sandbox']});
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto(`https://www.airbnb.com/hosting/listings/editor/${url}`);
    await page.waitForTimeout(10000);
    // await page.waitForSelector('body', { state: 'visible' });
    // let screenshot_path = `airbnb_screenshot/${functionKey}.png`;
    // await page.screenshot({ path:screenshot_path , fullPage: true })
    if(await page.url() == 'https://www.airbnb.com/hosting/listings'){
        return {'error':`invalid listing id`};
    }else{
    const functionGet = functionName[functionKey];
    const result = await functionGet(page);
    browser.close();
    console.log(`browser ${functionKey} finish`);
    return result;
    }
}
    catch(error){
        console.log('error at ', functionKey);
        console.log(error);

    }
    
}


module.exports = { scraper_main };