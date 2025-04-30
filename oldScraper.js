const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');
const { get } = require('http');



async function get_title(page){
    let title = await page.locator(".sjuzd45.dir.dir-ltr");
    let result = await title.textContent();
    return {"custom_link": result};
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
    console.log("get_property_type done");
    return {"Property type":{"most_like": most_like_result.trim(),"property_type": property_type_result.trim(), "listing_type": listing_type_result.trim(),"floors in the building" : floors,"floor is listing on":flors,"year built":year_built,"property_size":property_size,"propertySizeUnits":propertySizeUnits}};
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
    let weekend_price = await page.locator('xpath=//*[@id="pricing-and-availability-settings-rates-weekend-entrypoint"]/div[2]/div').textContent();
    let weekly_discount = await page.locator('//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]/div/div/div[2]/div[1]').textContent();
    let weekly_discount_average = await page.locator('xpath=//*[@id="pricing-and-availability-settings-weekly-discount-entrypoint"]/div/div/div[2]/div[2]').textContent();
    let month_discount = await page.locator('xpath=//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]/div/div/div[2]/div[1]').textContent();
    let month_discount_average = await page.locator('//*[@id="pricing-and-availability-settings-monthly-discount-entrypoint"]/div/div/div[2]/div[2]').textContent();

    return {"pricing": {"smart_pricing":smart_pricing_result,"price":price,"weekend_price":weekend_price,"weekly_discount":weekly_discount,"weekly_discount_average":weekly_discount_average,"month_discount":month_discount,"month_discount_average":month_discount_average}};
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
    let number_of_guest = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[6]/div/div');
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

    
    return {"description": {"listing_des": listing_des_result,"your_property": your_property_result}};
}
async function get_amenities(page){
    let amenities = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[9]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, amenities);
    return {"amenities": 'result'};
}
async function get_accessibility(page){
    let accessibility = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[10]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, accessibility);
    return {"accessibility": 'result'};
}
async function get_location(page){
    let location = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[11]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, location);
    return {"location": 'result'};
}
async function get_about_host(page){
    let about_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[12]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, about_host);
    return {"about_host": 'result'};
}
async function get_co_host(page){
    let co_host = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[13]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, co_host);
    return {"co_host": 'result'};
}
async function get_booking_setting(page){
    let booking_setting = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[14]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, booking_setting);
    return {"booking_setting": 'result'};
}
async function get_house_rules(page){
    let house_rules = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[15]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, house_rules);
    return {"house_rules": 'result'};
}
async function get_guest_safety(page){
    let guest_safety = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[16]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, guest_safety);
    return {"guest_safety": 'result'};
}
async function get_cancellation_policy(page){
    let cancellation_policy = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[17]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, cancellation_policy);
    return {"cancellation_policy": 'result'};
}
async function get_custom_link(page){
    let custom_link = await page.locator('xpath=//*[@id="panel--navigation-tabs--0"]/div[18]/div/a').elementHandle();
    await page.evaluate((element) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, custom_link);
    return {"custom_link": 'result'};
}

async function mainpasamain(){
    let scraper = [
        'get_title', 'get_property_type', 'get_pricing', 'get_number_of_guest', 
        'get_availability', 'get_description', 'get_amenities', 'get_accessibility', 
        'get_location', 'get_about_host', 'get_co_host', 'get_booking_setting', 
        'get_house_rules', 'get_guest_safety', 'get_cancellation_policy', 'get_custom_link'
    ]
    let results = await Promise.all(scraper.map(fn => main(fn)));
    fs.writeFileSync('airbnb_output.json', JSON.stringify(results, null, 2));
}

async function main(functionKey){

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
        'get_about_host': get_about_host,
        'get_co_host': get_co_host,
        'get_booking_setting': get_booking_setting,
        'get_house_rules': get_house_rules,
        'get_guest_safety': get_guest_safety,
        'get_cancellation_policy': get_cancellation_policy,
        'get_custom_link': get_custom_link
    };

    console.log("Function name is", functionName);
    const browser = await chromium.launch({ headless: true,args: ['--start-maximized'] });
    const context = await browser.newContext({viewport: null});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto('https://www.airbnb.com/hosting/listings/editor/1304752346146084328');
    await page.waitForTimeout(10000);
    await page.waitForSelector('body', { state: 'visible' });


    const functionGet = functionName[functionKey];
    const result = await functionGet(page);
    browser.close();
    console.log(`browser ${functionKey} finish`);
    return result;
    
}
mainpasamain();