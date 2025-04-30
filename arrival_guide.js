const { chromium } = require('playwright');
const  path  = require('path');
const fs = require('fs');


async function get_check_in(page) {
    await page.waitForTimeout(5000);
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
    return check_in_and_out_result;
}

async function get_direction(page) {
    let click_direction = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[3]/div/a');
    await click_direction.click();
    await page.waitForTimeout(5000);
    let direction = await page.locator('xpath=//*[@id="directions-text-area"]').first();
    let direction__result = await direction.textContent();
    return {"direction": direction__result};
}

async function get_check_in_method(page){
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[4]/div/a');
    await click.click();
    await page.waitForTimeout(5000);
    let index = '.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.c1b36svn.atm_26_1j28jx2.atm_3f_glywfm.atm_7l_1kw7nm4.atm_9j_tlke0l.atm_9s_1ulexfb.atm_gi_idpfg4.atm_l8_idpfg4.atm_r3_1kw7nm4.atm_rd_glywfm.atm_e2_1osqo2v.atm_vy_1osqo2v.atm_tl_1gw4zv3.c1bk42vd.atm_h3_14y27yu_1w3cfyq.atm_kd_glywfm_1w3cfyq.atm_uc_aaiy6o_1w3cfyq.atm_70_560gfn_1w3cfyq.atm_5j_kitwna_1w3cfyq.atm_3f_glywfm_e4a3ld.atm_l8_idpfg4_e4a3ld.atm_gi_idpfg4_e4a3ld.atm_3f_glywfm_1r4qscq.atm_kd_glywfm_6y7yyg.atm_uc_glywfm_1w3cfyq_1rrf6b5.atm_h3_14y27yu_pfnrn2_1oszvuo.atm_kd_glywfm_pfnrn2_1oszvuo.atm_uc_aaiy6o_pfnrn2_1oszvuo.atm_70_560gfn_pfnrn2_1oszvuo.atm_5j_kitwna_pfnrn2_1oszvuo.atm_3f_glywfm_1icshfk_1oszvuo.atm_l8_idpfg4_1icshfk_1oszvuo.atm_gi_idpfg4_1icshfk_1oszvuo.atm_3f_glywfm_b5gff8_1oszvuo.atm_kd_glywfm_2by9w9_1oszvuo.atm_uc_glywfm_pfnrn2_1o31aam.dir.dir-ltr';
    if (await page.locator(index).count() == 7){
        
        
        let smart_lock = await page.locator(index).nth(0);
        await smart_lock.click();
        let smart_lock_result = await page.locator('xpath=//*[@id="SMART_LOCK"]');
        let smart_lock_result_text = await smart_lock_result.textContent();


        let keypad= await page.locator(index).nth(1);
        await keypad.click();
        let keypad_result = await page.locator('xpath=//*[@id="KEYPAD"]');
        let keypad_result_text = await keypad_result.textContent(); 


        let lockbox = await page.locator(index).nth(2);
        await lockbox.click();
        let lockbox_result = await page.locator('xpath=//*[@id="LOCKBOX"]');
        let lockbox_result_text = await lockbox_result.textContent();


        let building_staff = await page.locator(index).nth(3);
        await building_staff.click();
        let building_staff_result = await page.locator('xpath=//*[@id="BUILDING_STAFF"]');
        let building_staff_result_text = await building_staff_result.textContent();

        let in_person = await page.locator(index).nth(4);
        await in_person.click();
        let in_person_result = await page.locator('xpath=//*[@id="HOST_GREETS"]');
        let in_person_result_text = await in_person_result.textContent();

        
        let other = await page.locator(index).nth(5);
        await other.click();
        let other_result = await page.locator('xpath=//*[@id="OTHER"]');
        let other_result_text = await other_result.textContent();
        
        let check_in_method_result = {'check_in': {'smart_lock':smart_lock_result_text, 'keypad':keypad_result_text, 'lockbox':lockbox_result_text, 'building_staff':building_staff_result_text, 'in_person':in_person_result_text, 'other':other_result_text}};
        return check_in_method_result;
    }
    else{
        let method_detail;
        let method_name = await page.locator('.lgxztkj.atm_c8_sz6sci.atm_g3_17zsb9a.atm_fr_kzfbxz.atm_cs_10d11i2.dir.dir-ltr');
        let method_name_result = await method_name.textContent();
        await page.waitForTimeout(2000);
        let clicking_first = await page.locator('xpath=//*[@id="site-content"]/div/div/div/section[1]/section/div/div/div/div[1]/button');
        await clicking_first.click();
        await page.waitForTimeout(2000);
        let method_name_detail = await page.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.r9l1323.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_9s_1txwivl.atm_r3_1e5hqsa.atm_cx_n9wab5.atm_fc_1yb4nlp.atm_2d_1p8m8iw.atm_7l_1esdqks.atm_cs_6adqpa.atm_3f_glywfm.r8p97wf.atm_h_1h6ojuz.r952u86.atm_l8_1mghb4r.atm_67_1vlbu9m.dir.dir-ltr');
        await method_name_detail.click();
        await page.waitForTimeout(2000);

        if(method_name_result == 'Smart Lock'){
        let smart_lock_result = await page.locator('xpath=//*[@id="SMART_LOCK"]');
        method_detail = await smart_lock_result.textContent();
        }else if(method_name_result == 'Keypad'){
        let keypad_result = await page.locator('xpath=//*[@id="KEYPAD"]');
        method_detail = await keypad_result.textContent(); 
        }else if(method_name_result == 'Lockbox'){
        let lockbox_result = await page.locator('xpath=//*[@id="LOCKBOX"]');
        method_detail = await lockbox_result.textContent();
        }else if(method_name_result == 'Building Staff'){
        let building_staff_result = await page.locator('xpath=//*[@id="BUILDING_STAFF"]');
        method_detail = await building_staff_result.textContent();
        }else if(method_name_result == 'In-person greeting'){
        let in_person_result = await page.locator('xpath=//*[@id="HOST_GREETS"]');
        method_detail = await in_person_result.textContent();
        }else if(method_name_result == 'Other'){
        let other_result = await page.locator('xpath=//*[@id="OTHER"]');
        method_detail = await other_result.textContent();
        }
        let check_in_instruction_result;
        try{
            let check_in_instruction = await page.locator('.c112bbfv.atm_5j_kitwna.atm_h3_1yuitx.atm_l8_1ph3nq8.atm_3f_1vlbu9m.atm_9s_1txwivl.atm_ar_1bp4okc.atm_cx_1ph3nq8.dir.dir-ltr');
            let find_text = await page.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.c1b36svn.atm_26_1j28jx2.atm_3f_glywfm.atm_7l_1kw7nm4.atm_9j_tlke0l.atm_9s_1ulexfb.atm_gi_idpfg4.atm_l8_idpfg4.atm_r3_1kw7nm4.atm_rd_glywfm.atm_e2_1osqo2v.atm_vy_1osqo2v.atm_tl_1gw4zv3.dir.dir-ltr').count();
            let check_in_instruction_result_list = [];
            for(let i = 0; i < find_text; i++){
                let one_by_one = await page.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.c1b36svn.atm_26_1j28jx2.atm_3f_glywfm.atm_7l_1kw7nm4.atm_9j_tlke0l.atm_9s_1ulexfb.atm_gi_idpfg4.atm_l8_idpfg4.atm_r3_1kw7nm4.atm_rd_glywfm.atm_e2_1osqo2v.atm_vy_1osqo2v.atm_tl_1gw4zv3.dir.dir-ltr').nth(i);
                await one_by_one.click();
                await page.waitForTimeout(2000);
                let check_in_instruction_text = await page.locator('xpath=//*[@id="edit-check-in-instruction"]');
                let check_in_instruction_text_result = await check_in_instruction_text.textContent();
                let number = `check_in_instruction_number_${i + 1}`;
                check_in_instruction_result_list.push({ [number]: check_in_instruction_text_result });
            }
            check_in_instruction_result = check_in_instruction_result_list;
        }
        catch(err){
            check_in_instruction_result = "no check in instruction";
        }

        return {'check_in':{"check_in_method": {'name':method_name_result,'details':method_detail}, "check_in_instruction": Object.assign({}, ...check_in_instruction_result)}};
    }
}

async function get_wifi_details(page){
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[5]/div/a');
    await click.click();
    await page.waitForTimeout(5000);

    let wifi_network_name = await page.locator('xpath=//*[@id="wifi-name"]');
    let wifi_network_name_result = await wifi_network_name.inputValue();
    let wifi_network_password = await page.locator('xpath=//*[@id="wifi-password"]');
    let wifi_network_password_result = await wifi_network_password.inputValue();
    let wifi_network_details = {"wifi_network_name": wifi_network_name_result, "wifi_network_password": wifi_network_password_result};
    return {"wifi_details": wifi_network_details};
}


async function get_home_manual(page){
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[6]/div/a');
    await click.click();
    await page.waitForTimeout(5000);
    let home_manual = await page.locator('xpath=//*[@id="house-manual-textarea"]');
    let home_manual_result = await home_manual.textContent();
    return {"home_manual": home_manual_result};
}

async function get_house_rules(page){
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[7]/div/a');
    await click.click();
    await page.waitForTimeout(5000);
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

async function get_checkout_instruction(page){
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[8]/div/a');
    await click.click();
    await page.waitForTimeout(5000);
    let final_instruction;
    try{
        let checkout_instruction = await page.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.bg5rtr6.atm_9j_tlke0l.atm_r3_1h6ojuz.atm_rd_glywfm.atm_70_5j5alw.atm_vy_1wugsn5.atm_26_d0eyo3.atm_c8_dlk8xv.atm_bx_1kw7nm4.atm_tl_1gw4zv3.atm_9s_1ulexfb.atm_mk_stnw88.atm_26_i-1j28jx2.atm_3f_glywfm.atm_7l_1kw7nm4.atm_1s_glywfm.atm_fq_idpfg4.atm_tk_idpfg4.atm_n3_idpfg4.atm_6i_idpfg4.atm_l8_idpfg4.atm_gi_idpfg4.atm_9j_13gfvf7_1o5j5ji.atm_k4_si67jz_1o5j5ji.atm_9j_tlke0l_1nos8r_uv4tnr.dir.dir-ltr').count();
        let checkout_instruction_result = [];
        console.log(checkout_instruction);
        for(let i = 0; i < checkout_instruction; i++){
            await page.waitForTimeout(2000);
            let one_by_one = await page.locator('.l1ovpqvx.atm_1he2i46_1k8pnbi_10saat9.atm_yxpdqi_1pv6nv4_10saat9.atm_1a0hdzc_w1h1e8_10saat9.atm_2bu6ew_929bqk_10saat9.atm_12oyo1u_73u7pn_10saat9.atm_fiaz40_1etamxe_10saat9.b19rgdxi.atm_c8_1kw7nm4.atm_bx_1kw7nm4.atm_cs_1kw7nm4.atm_cd_1kw7nm4.atm_ci_1kw7nm4.atm_g3_1kw7nm4.atm_9j_tlke0l_1nos8r_uv4tnr.cnqzfl6.atm_1s_glywfm.atm_26_1j28jx2.atm_3f_idpfg4.atm_9j_tlke0l.atm_gi_idpfg4.atm_l8_idpfg4.atm_vb_1wugsn5.atm_7l_jt7fhx.atm_rd_glywfm.atm_kd_glywfm.atm_9j_13gfvf7_1o5j5ji.atm_rd_glywfm_1mj13j2_uv4tnr.atm_3f_glywfm_jo46a5.atm_l8_idpfg4_jo46a5.atm_gi_idpfg4_jo46a5.atm_3f_glywfm_1icshfk.atm_kd_glywfm_19774hq.atm_7l_jt7fhx_1w3cfyq.atm_5j_1896hn4_1w3cfyq.atm_uc_aaiy6o_1w3cfyq.atm_70_pz9q34_1w3cfyq.atm_uc_glywfm_1w3cfyq_1rrf6b5.atm_5j_1896hn4_pfnrn2_1oszvuo.atm_uc_aaiy6o_pfnrn2_1oszvuo.atm_70_pz9q34_pfnrn2_1oszvuo.atm_uc_glywfm_pfnrn2_1o31aam.atm_7l_jt7fhx_1nos8r_uv4tnr.atm_rd_glywfm_1nos8r_uv4tnr.atm_7l_9vytuy_4fughm_uv4tnr.atm_rd_glywfm_4fughm_uv4tnr.atm_7l_jt7fhx_csw3t1.atm_rd_glywfm_csw3t1.atm_7l_jt7fhx_pfnrn2.atm_rd_glywfm_pfnrn2.atm_7l_9vytuy_1o5j5ji.atm_rd_glywfm_1o5j5ji.dir.dir-ltr').nth(i);
            await one_by_one.click({ force: true });
            await page.waitForTimeout(2000);
            let checkout_instruction_name = await page.locator('.h1mm3jk8.atm_c8_1s1l5wp.atm_g3_1cxhbm1.atm_fr_1ulgq8t.atm_cs_10d11i2.dir.dir-ltr');
            let checkout_instruction_name_result = await checkout_instruction_name.textContent();
            let checkout_instruction_text = await page.locator('xpath=//*[@id="add-details-textbox"]');
            let checkout_instruction_text_result = await checkout_instruction_text.textContent();
            let number = `checkout_instruction_number_${i + 1}`;
            checkout_instruction_result.push({ [number]: {'name':checkout_instruction_name_result,'instruction':checkout_instruction_text_result} });
        }
        final_instruction = Object.assign({}, ...checkout_instruction_result);;
    }catch(error){
        console.log(error);
        final_instruction = "no checkout instruction";
    }
    return {"checkout_instruction": final_instruction};
}

async function get_interaction_preferences(page){
    let final_interaction_preferences;
    let click = await page.locator('xpath=//*[@id="panel--navigation-tabs--1"]/div[10]/div/a');
    await click.click();
    await page.waitForTimeout(5000);
    try{
        let selected_radio = await page.locator('input[name="interaction-preferences-chip-group"]:checked');

        if (selected_radio) {
            let label_container = await selected_radio.locator('xpath=ancestor::label');
            await page.waitForTimeout(2000);
            let selected_text = await label_container.locator('.l1my6y4d.atm_c8_16fp2vl.atm_g3_x9fz81.atm_fr_12ckmjc.atm_cs_6adqpa.atm_ll_1od0ugv__1v156lz.dir.dir-ltr').first();
            let selected_text_result = await selected_text.textContent();

            final_interaction_preferences = selected_text_result;
        } else {
            final_interaction_preferences = 'No radio button is selected.';
        }
        return {"interaction_preferences": final_interaction_preferences};
    }catch(error){
        console.log(error);
    }
}

async function arrival_guide_main(functionName,url){
    // let scraper = [
    //     'get_title', 'get_property_type', 'get_pricing','get_availability','get_number_of_guest', 
    //      'get_description', 'get_amenities', 
    //     'get_location', 'get_booking_setting', 
    //     'get_house_rules', 'get_guest_safety','get_cancellation_policy', 'get_custom_link'
    // ]
    // get_cancellation_policy
    // let scraper = [ 'get_custom_link'    ]
    let results = await Promise.all(functionName.map(fn => arrival_guide(fn,url)));
    let result_final = Object.assign({}, ...results);
    fs.writeFileSync('arrival_guide_output.json', JSON.stringify(result_final, null, 2));
    return {"Result":result_final};
}



async function arrival_guide(functionKey,url) {
    const functionName = {
        'get_check_in': get_check_in,
        'get_direction': get_direction,
        'get_check_in_method': get_check_in_method,
        'get_wifi_details': get_wifi_details,
        'get_home_manual': get_home_manual,
        'get_house_rules': get_house_rules,
        'get_checkout_instruction': get_checkout_instruction,
        'get_interaction_preferences': get_interaction_preferences
    }
    const browser = await chromium.launch({ headless: true  ,args: ['--start-maximized'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    await page.goto(`https://www.airbnb.com/hosting/listings/editor/${url}/arrival/`);
    await page.waitForTimeout(10000);
    await page.waitForSelector('body', { state: 'visible' });
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
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

let aa = arrival_guide_main(['get_check_in','get_interaction_preferences','get_direction','get_check_in_method','get_wifi_details','get_home_manual','get_house_rules','get_checkout_instruction'],'1396739689985046384');