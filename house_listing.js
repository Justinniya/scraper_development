const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');
const path = require('path');
const { add } = require('date-fns');
const { on } = require('events');
const { url } = require('inspector');

const streamPipeline = promisify(pipeline);

async function number_of_guests(page,guest_number) {
    let guest = 2
    if(guest_number > guest){
        for(let i = 0; i < guest_number - guest; i++){
            let add_guest = await page.locator('xpath=//*[@id="stepper-item--0-guests-stepper"]/button[2]');
            add_guest.click();
            await page.waitForTimeout(500);
            
        }
    }
    else if(guest > guest_number){
        for(let i = 0; i < guest - guest_number; i++){
            let minus_guest = await page.locator('xpath=//*[@id="stepper-item--0-guests-stepper"]/button[2]');
            minus_guest.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}


async function number_of_bedroom(page,bedroom_number) {
    let Bedrooms = 1
    if(bedroom_number > Bedrooms){
        for(let i = 0; i < bedroom_number - Bedrooms; i++){
            let add_bedroom = await page.locator('xpath=//*[@id="stepper-item--1-bedrooms-stepper"]/button[2]');
            add_bedroom.click();
            await page.waitForTimeout(500);
        }
    }
    else if(Bedrooms > bedroom_number){
        for(let i = 0; i < 1; i++){
            let minus_bedroom = await page.locator('xpath=//*[@id="stepper-item--1-bedrooms-stepper"]/button[1]');
            minus_bedroom.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

async function number_of_beds(page,beds_number) {
    let beds = 1
    if(beds < beds_number){
        for(let i = 0; i < beds_number - beds; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--2-beds-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}
async function number_of_beds2(page,beds_number) {
    let beds = 1
    if(beds < beds_number){
        for(let i = 0; i < beds_number - beds; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--1-beds-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}

async function bedroom_lock(page,bedroom_have_lock) {
    if(bedroom_have_lock){
        let bedroom_lock = await page.locator('xpath=//*[@id="lock-radio-input--0-row-radio-button"]');
        bedroom_lock.click();
        await page.waitForTimeout(500);
    }
    else{
        let bedroom_lock = await page.locator('xpath=//*[@id="lock-radio-input--1-row-radio-button"]');
        bedroom_lock.click();
        await page.waitForTimeout(500);
    }
    return true;
}

async function else_might_be_there(page,else_might_be_there) {
    let who_else = {
        "Me": 1,
        "My_family": 2,
        "Other_guests": 3,
        "Roommates": 4
      }

    for (let oneby of else_might_be_there){
        let who_else_be_there = await page.locator(`//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${who_else[oneby]}]/button`);
        await page.waitForTimeout(2000);
        await who_else_be_there.click();
    }

    return true;

}

async function describe_hotel(page,describe_hotel) {
    let describe = {
        "Charming": 1,
        "Hip": 2,
        "Stylish": 3,
        "Upscale": 4,
        "Central": 5,
        "Unique": 6
      }
      for (let oneby of describe_hotel){
        let describe_button = await page.locator(`xpath = //*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div/div[${describe[oneby]}]/button`);
        await page.waitForTimeout(2000);
        await describe_button.click();
    }
    return true;
}

async function private_and_attached(page,number_of_private_and_attached){
    if(number_of_private_and_attached == 0){
        return true
    }
    for(let i = 0; i < number_of_private_and_attached; i++){
        let add_paa = await page.locator('xpath=//*[@id="stepper-item--0-ENSUITE-stepper"]/button[2]');
        add_paa.click();
        await page.waitForTimeout(500);
    }
    return true;
}

async function dedicated(page,number_dedicated){
    if(number_dedicated == 0){
        return true;
    }
    for(let i = 0; i<number_dedicated; i++){
        let add_dedicated = await page.locator('xpath=//*[@id="stepper-item--1-DEDICATED-stepper"]/button[2]');
        add_dedicated.click();
        await page.waitForTimeout(500);
    }
    return true;
}

async  function shared(page,number_of_shared){
    if(number_of_shared == 0){
        return true;
    }
    for(let i = 0; i<number_of_shared; i++){
        let add_shared = await page.locator('xpath=//*[@id="stepper-item--2-SHARED-stepper"]/button[2]');
        add_shared.click();
        await page.waitForTimeout(500);
    }
    return true;
}

async function tell_guest_what_your_place_offer_function(page,guest_want){
    let tell_guest_what_your_place_offer_list = {
        "Wifi": { column: 2, row: 1 },
        "TV": { column: 2, row: 2 },
        "Kitchen": { column: 2, row: 3 },
        "Washer": { column: 2, row: 4 },
        "Free_parking_on_premises": { column: 2, row: 5 },
        "Paid_parking_on_premises": { column: 2, row: 6 },
        "Air_conditioning": { column: 2, row: 7 },
        "Dedicated_workspace": { column: 2, row: 8 },
      
        "Pool": { column: 3, row: 1 },
        "Hot_tub": { column: 3, row: 2 },
        "Patio": { column: 3, row: 3 },
        "BBQ_grill": { column: 3, row: 4 },
        "Outdoor_dining_area": { column: 3, row: 5 },
        "Fire_pit": { column: 3, row: 6 },
        "Pool_table": { column: 3, row: 7 },
        "Indoor_fireplace": { column: 3, row: 8 },
        "Piano": { column: 3, row: 9 },
        "Exercise_equipment": { column: 3, row: 10 },
        "Lake_access": { column: 3, row: 11 },
        "Beach_access": { column: 3, row: 12 },
        "Ski_in_Ski_out": { column: 3, row: 13 },
        "Outdoor_shower": { column: 3, row: 14 },
      
        "Smoke_alarm": { column: 4, row: 1 },
        "First_aid_kit": { column: 4, row: 2 },
        "Fire_extinguisher": { column: 4, row: 3 },
        "Carbon_monoxide": { column: 4, row: 4 }
      };

      
    for(let oneby of guest_want){
        let item = tell_guest_what_your_place_offer_list[oneby];
        if(item){
            let { column, row } = item
        let click_it = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[${column}]/div/div[${row}]/button`);
        await page.waitForTimeout(500);
        await click_it.click();
        }
        else{
            console.log('item not found',oneby);
        }
    }

    return true;

}

async function pick_your_booking_settings(page,book_setting){
    let book = {
        'approve_your_first_5_booking': 1,
        'use_instant_book':2
    };
    let settings = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${book[book_setting]}]/button`);
    await page.waitForTimeout(2000);
    await settings.click();
    return true;
}

async function choose_who_to_welcome_for_your_first_reservation(page,who_guest){
    let who = {
        'any_airbnb_guest' : 1,
        'an_experienced_guest': 2
    }
    let guest = await page.locator(`xpath=//*[@id="list-selection-radio-card-views"]/div[${who[who_guest]}]`)
    await page.waitForTimeout(2000);
    await guest.click();
    return true;
}

async function add_discount(page, discounts) {
    let discounts_value = {
        'new_listing_promotion': { check_box: 'xpath=//*[@id="newListingPromotion-checkbox"]' },
        'weekly_discount': { check_box: 'xpath=//*[@id="weeklyDiscount-checkbox"]' },
        'monthly_discount': { check_box: 'xpath=//*[@id="monthlyDiscount-checkbox"]' }
    };

    // Loop through all the discount checkboxes and uncheck them first
    for (let key in discounts_value) {
        let checkboxLocator = page.locator(discounts_value[key].check_box);
        let isChecked = await checkboxLocator.isChecked();
        
        if (isChecked) {
            // If checked, uncheck it
            await checkboxLocator.click();
        }
    }

    // Now check the selected discount checkbox (e.g., 'monthly_discount')
    if (discounts_value[discounts[0]]) {  // Only one value is passed, assuming a single discount is selected
        let selectedDiscount = discounts[0];
        let selectedLocator = page.locator(discounts_value[selectedDiscount].check_box);
        
        let isChecked = await selectedLocator.isChecked();
        if (!isChecked) {
            // If it's not checked, check it
            await selectedLocator.click();
        }
    }

    return true;
}

async function share_safety_details(page, your_place_have_any_of_these) {
    const your_place = {
        'exterior_security_camera': {
            check_box: 'xpath=//*[@id="SURVEILLANCE-row-checkbox"]',
            button: 'xpath=//*[@id="SURVEILLANCE"]/label/div/div[2]'
        },
        'noise_decibel_monitor': {
            check_box: 'xpath=//*[@id="NOISE_MONITOR-row-checkbox"]',
            button: 'xpath=//*[@id="NOISE_MONITOR"]/label/div/div[2]'
        },
        'weapons_on_property': {
            check_box: 'xpath=//*[@id="WEAPONS-row-checkbox"]',
            button: 'xpath=//*[@id="WEAPONS"]/label/div/div[2]'
        }
    };

    for (let itemEntry of your_place_have_any_of_these) {
        let key = '';
        let message = '';

        if (typeof itemEntry === 'string') {
            key = itemEntry;
        } else if (typeof itemEntry === 'object') {
            key = Object.keys(itemEntry)[0];
            message = itemEntry[key]?.message || '';
        }

        const item = your_place[key];
        if (item) {
            const { check_box, button } = item;
            const isChecked = await page.locator(check_box).isChecked();
            if (!isChecked) {
                await page.waitForTimeout(2000);
                await page.locator(button).click();

                if (key === 'exterior_security_camera' && message) {
                    await page.waitForTimeout(1000);
                    await page.keyboard.type(message);
                    await page.waitForTimeout(2000);
                    await page.locator('xpath=/html/body/div[9]/div/section/div/div/div[2]/div/footer/button').click();
                }
            }
        } else {
            console.log(`Safety option "${key}" not found.`);
        }
    }

    return true;
}

async function number_of_bathrooms(page,bathrooms_number) {
    let bath_rooms = 1
    if(bath_rooms < bathrooms_number){
        for(let i = 0; i < (bathrooms_number * 2) - bath_rooms; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--2-bathrooms-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}
async function number_of_bathrooms2(page,bathrooms_number) {
    let bath_rooms = 1
    if(bath_rooms < bathrooms_number){
        for(let i = 0; i < (bathrooms_number * 2) - bath_rooms; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--3-bathrooms-stepper"]/button[2]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
    }
    return true;
}


async function downloadImage(url, outputPath) {
  const response = await new Promise((resolve, reject) => {
    https.get(url, resolve).on('error', reject);
  });

  if (response.statusCode !== 200) {
    throw new Error(`Failed to get '${url}' (${response.statusCode})`);
  }
  console.log('Downloading image from:', url);
  await streamPipeline(response, fs.createWriteStream(outputPath));
}

async function choose_function(page,data){
    let choices = {
        "House": 1,
        "Apartment": 2,
        "Barn": 3,
        "Bed_&_breakfast": 4,
        "Boat": 5,
        "Cabin": 6,
        "Camper/RV": 7,
        "Casa_particular": 8,
        "Castle": 9,
        "Cave": 10,
        "Container": 11,
        "Cycladic_home": 12,
        "Dammuso": 13,
        "Dome": 14,
        "Earth_home": 15,
        "Farm": 16,
        "Guesthouse": 17,
        "Hotel": 18,
        "Houseboat": 19,
        "Kezhan": 20,
        "Minsu": 21,
        "Riad": 22,
        "Ryokan": 23,
        "Shepherd’s_hut": 24,
        "Tent": 25,
        "Tiny_home": 26,
        "Tower": 27,
        "Treehouse": 28,
        "Trullo": 29,
        "Windmill": 30,
        "Yurt": 31
      }
      
    let choose_place = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div[${choices[data['choose_place']]}]/button`).nth(0);
    await page. waitForTimeout(5000);
    await choose_place.click({ force: true });
    await page.waitForTimeout(2000);
    
    let next2 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // choose_place
    await next2.click();
    await page.waitForTimeout(2000);
}

async function guest_will_function(page,data){
    let place_guest_will = {
        "a_room": 1,
        "a_shared_room_in_a_hostel": 2
      }
    let place_guest_have = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${place_guest_will[data['place_guest_will']]}]/button`).nth(0);
    await page.waitForTimeout(2000);
    await place_guest_have.click();
    await page.waitForTimeout(2000);
    let next3 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // place_guest_have
    await next3.click();
    await page.waitForTimeout(2000);
}
async function guest_will_function2(page,data){
    let place_guest_will = {
        "a_entire_place": 1,
        "a_room": 2,
        "a_shared_room_in_a_hostel": 3
      }
    let place_guest_have = await page.locator(`xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div[${place_guest_will[data['place_guest_will']]}]/button`).nth(0);
    await page.waitForTimeout(2000);
    await place_guest_have.click();
    await page.waitForTimeout(2000);
    let next3 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // place_guest_have
    await next3.click();
    await page.waitForTimeout(2000);
}

async function address_function(page,data){
    let enter_address = await page.locator('input[placeholder="Enter your address"]').nth(0);
    await page.waitForTimeout(2000);
    await enter_address.click();
    await page.keyboard.type('zarraga');
    await page.click('li#autocomplete-result-0');
    await page.waitForTimeout(2000);
    let address = data['address'];

    const unitLevelValue       = address['unitLevelValue'];
    const buildingNameValue    = address['buildingNameValue'];
    const streetAddressValue   = address['streetAddressValue'];
    const brgyDistrictValue    = address['brgyDistrictValue'];
    const cityMunicipalityValue= address['cityMunicipalityValue'];
    const postalCodeValue      = address['postalCodeValue'];
    const provinceValue        = address['provinceValue'];

    // Option A: using page.fill()
    await page.fill('xpath=//*[@id="apt"]',            unitLevelValue);
    await page.fill('xpath=//*[@id="additionalInfo"]', buildingNameValue);
    await page.fill('xpath=//*[@id="street"]',      streetAddressValue);
    await page.fill('xpath=//*[@id="district"]',       brgyDistrictValue);
    await page.fill('xpath=//*[@id="city"]',           cityMunicipalityValue);
    await page.fill('xpath=//*[@id="zipcode"]',        postalCodeValue);
    await page.fill('xpath=//*[@id="state"]',          provinceValue);
    await page.waitForTimeout(2000);
    let next4 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // enter_address
    await next4.click();
    await page.waitForTimeout(2000);
    let yes_its_correct = await page.locator('xpath=/html/body/div[10]/div/section/div/div/div[2]/div/div[3]/footer/button[2]').nth(0);
    await page.waitForTimeout(2000);
    await yes_its_correct.click();
    await page.waitForTimeout(2000);
    let next5 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // yes_its_correct
    await next5.click();
    await page.waitForTimeout(2000);
}


async function room_guest_stay_function(page,data){
    let guest_stay = data['how_many_people_can_stay_here'];
    await number_of_guests(page,guest_stay['number_of_guests']);
    console.log("Number of guests");
    await page.waitForTimeout(500);
    await number_of_bedroom(page,guest_stay['number_of_bedroom']);
    console.log("number_of_bedroom");
    await page.waitForTimeout(500);
    await number_of_beds(page,guest_stay['number_of_beds']);
    console.log("number_of_beds");
    await page.waitForTimeout(500);
    await bedroom_lock(page,guest_stay['bedroom_lock']);
    console.log("bedroom_lock");
    await page.waitForTimeout(500);

    await page.waitForTimeout(2000);
    let next6 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // number_of_guests
    await next6.click();
    await page.waitForTimeout(2000);
}

async function entire_guest_stay_function(page,data){
    let guest_stay = data['how_many_people_can_stay_here'];
    await number_of_guests(page,guest_stay['number_of_guests']);
    console.log("Number of guests");
    await page.waitForTimeout(500);
    await number_of_bedroom(page,guest_stay['number_of_bedroom']);
    console.log("number_of_bedroom");
    await page.waitForTimeout(500);
    await number_of_beds(page,guest_stay['number_of_beds']);
    console.log("number_of_beds");
    await page.waitForTimeout(500);
    await number_of_bathrooms2(page,guest_stay['number_of_bathrooms']);
    console.log("bedroom_lock");
    await page.waitForTimeout(500);

    await page.waitForTimeout(2000);
    let next6 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // number_of_guests
    await next6.click();
    await page.waitForTimeout(2000);
}

async function shared_guest_stay_function(page,data){
    let guest_stay = data['how_many_people_can_stay_here'];
    await number_of_guests(page,guest_stay['number_of_guests']);
    console.log("Number of guests");
    await page.waitForTimeout(500);
    await number_of_beds2(page,guest_stay['number_of_beds']);
    console.log("number_of_beds");
    await page.waitForTimeout(500);
    await number_of_bathrooms(page,guest_stay['number_of_bathrooms']);
    console.log("bedroom_lock");
    await page.waitForTimeout(500);

    await page.waitForTimeout(2000);
    let next6 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // number_of_guests
    await next6.click();
    await page.waitForTimeout(2000);
}

async function bathroom_for_guest_function(page,data){
    let bathrooms_are_available_to_guests = data['bathrooms_are_available_to_guests']
    await private_and_attached(page,bathrooms_are_available_to_guests['private_and_attached']);
    await dedicated(page,bathrooms_are_available_to_guests['dedicated']);
    await shared(page,bathrooms_are_available_to_guests['shared']);


    let next7 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // bathroom for guests
    await next7.click();


    await page.waitForTimeout(2000);
}
async function who_else_function(page,data){
    await else_might_be_there(page,data['else_might_be_there']);
    await page.waitForTimeout(2000);
    let next8 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // who else might be there
    await next8.click();


    await page.waitForTimeout(2000);
}
async function step_2(page,data){
    // step 2
    let step2 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await step2.click();
}
async function last_function(page,data){
    let id;
    let guest_want = [
        "Wifi",
        "TV",
        // "Kitchen",
        "Washer",
        "Free_parking_on_premises",
        "Paid_parking_on_premises",
        // "Air_conditioning",
        // "Dedicated_workspace",
        "Pool",
        "Hot_tub",
        "Patio",
        "BBQ_grill",
        "Outdoor_dining_area",
        "Fire_pit",
        // "Pool_table",
        // "Indoor_fireplace",
        "Piano",
        "Exercise_equipment",
        "Lake_access",
        "Beach_access",
        "Ski_in_Ski_out",
        // "Outdoor_shower",
        // "Smoke_alarm",
        "First_aid_kit",
        "Fire_extinguisher",
        "Carbon_monoxide"
      ];

    await tell_guest_what_your_place_offer_function(page,data['tell_guest_what_your_place_offer_function'])

    await page.waitForTimeout(2000);
    let step21 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // tell_guest_what_your_place_offer_function
    await step21.click();

    let imageUrls = data['imageUrls'];
    const imagePaths = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const ext = path.extname(imageUrls[i]) || '.jpg';
      const filePath = path.resolve(__dirname, `image${i}.png`);
      await downloadImage(imageUrls[i], filePath);
      imagePaths.push(filePath);
    }
    try{
    await page.waitForTimeout(2000);
    let add_phots = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/div/div/div/div/div/div/div/div/button');
    await page.waitForTimeout(2000);
    await add_phots.click();
    await page.waitForTimeout(2000);

    console.log("UPloading",imagePaths);
    let upload = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[1]/div/div/div/div/div[2]/input');
    await page.waitForTimeout(2000);
    await upload.setInputFiles(imagePaths);
    await page.waitForTimeout(2000);
    let upload_now = await page.locator('xpath=/html/body/div[9]/div/section/div/div/div[2]/div/footer/button[2]');
    await page.waitForTimeout(2000);
    await upload_now.click();
    }catch(err){
        console.log("no photos");
    }
    await page.waitForTimeout(20000);
    let next9 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next9.click();
    await page.waitForTimeout(2000);
    imagePaths.forEach((p) => fs.unlinkSync(p));
    await page.waitForTimeout(2000);
    let title = await page.locator('xpath=//*[@id="title.title"]');
    await page.waitForTimeout(2000);
    // title
    await title.fill('Beautiful and cozy home');
    await page.waitForTimeout(2000);
    let next10 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next10.click();
    // describe

    await describe_hotel(page,data['describe_hotel']);

    await page.waitForTimeout(2000);
    let next11 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next11.click();
    // description 
    await page.waitForTimeout(2000);
    await page.fill('#description\\.summary', data['description']);

    await page.waitForTimeout(2000);
    let next12 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next12.click();

    // step 3
    await page.waitForTimeout(2000);
    let next13 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);

    // click step 3
    await next13.click();
    await page.waitForTimeout(2000);

    await pick_your_booking_settings(page,data['pick_your_booking_settings']);
    let next14 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // pick_your_booking_settings
    await next14.click();
    await page.waitForTimeout(2000);

    await choose_who_to_welcome_for_your_first_reservation(page,data['choose_who_to_welcome_for_your_first_reservation']);

    let next15 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // choose_who_to_welcome_for_your_first_reservation
    await next15.click();
    await page.waitForTimeout(2000);

    await page.fill('#lys-base-price-input', '1500');
    let next16 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // set_your_price
    await next16.click();
    await page.waitForTimeout(3000);


    await add_discount(page,data['add_discount']);
    await page.waitForTimeout(2000);
    let next17 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // add_discount
    await next17.click();
    await page.waitForTimeout(2000);
    let url = await page.url();
    let regex = /\/become-a-host\/(\d+)\//;
    let match = url.match(regex);

    id = match[1];  
    let your_place_have_any_of_these = data['share_safety_details'];
    await share_safety_details(page,your_place_have_any_of_these);
    await page.waitForTimeout(2000);
    let next18 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // share_safety_details
    await next18.click();
    await page.waitForTimeout(2000);
    return id;
}

async function a_room_function(page,data){
    await choose_function(page,data);
    await guest_will_function2(page,data);
    await address_function(page,data);
    await room_guest_stay_function(page,data);
    await bathroom_for_guest_function(page,data);
    await who_else_function(page,data);
    await step_2(page,data);
    let id = await last_function(page,data);
    return id
}

async function an_entire_function(page,data){
    await choose_function(page,data);
    await guest_will_function2(page,data);
    await address_function(page,data);
    await entire_guest_stay_function(page,data);
    await step_2(page,data);
    let id = await last_function(page,data);
    return id
}
async function shared_function(page,data){
    await choose_function(page,data);
    await guest_will_function2(page,data);
    await address_function(page,data);
    await shared_guest_stay_function(page,data);
    await step_2(page,data);
    let id = await last_function(page,data);
    return id
}
// main function


async function hotel_listing(data) {
    
    let id;
    const browser = await chromium.launch({ headless: false  ,args: ['--start-maximized'] });
    const context = await browser.newContext({userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'});
    const page = await context.newPage();
    await page.waitForTimeout(5000);
    try{
    const cookies = JSON.parse(fs.readFileSync('airbnb.json', 'utf-8'));
    await context.addCookies(cookies);
    console.log("done");
    }catch(err){
        console.log('No cookies to add');
    }
    await page.waitForTimeout(2000);
    await page.goto('https://www.airbnb.com');
    await page.waitForTimeout(5000);
    await page.goto('https://www.airbnb.com/become-a-host');
    await page.waitForTimeout(5000);
    let start = await page.getByText('Create a new listing');
    await page.waitForTimeout(5000);
    await start.click();
    let get_started = await page.locator('xpath=//*[@id="react-application"]/div/div/div[1]/main/div[2]/div[2]/div/div/div/button').nth(0);
    await page.waitForTimeout(2000);
    await get_started.click();
    await page.waitForTimeout(5000)
    let button1 = "Start on your own";
    let button2 = "Match with a Superhost"
    let start_new = await page.getByText(button1).nth(1);
    await start_new.click();
    await page.waitForTimeout(5000);
    let next1 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    await next1.click({ force: true });

    if(data['place_guest_will'] == "a_room"){
        id = await a_room_function(page,data);
        }
    else if(data['place_guest_will'] == "a_entire_place"){
        id = await an_entire_function(page,data)
    }
    else if(data['place_guest_will'] == "a_shared_room_in_a_hostel"){
        id = await shared_function(page,data);
    }else{
        return "Error";
    }

    
    await page.waitForTimeout(10000)
    
    console.log(id);
    await page.close();
};

// a_room
let data_final = {
    'choose_place': 'House',
    // "an_entire_place"
    // "a_room"
    // "a_shared_room_in_a_hostel"
    'place_guest_will' : 'a_room',
    'address':{
      'unitLevelValue' :'10A',
      'buildingNameValue'    : 'Sunrise Towers',
      'streetAddressValue'   : '123 Mango St.',
      'brgyDistrictValue'    : 'Lapuz',
      'cityMunicipalityValue': 'Iloilo City',
      'postalCodeValue'      : '5000',
      'provinceValue'        : 'Iloilo',
    },
    'how_many_people_can_stay_here':{
        'number_of_guests': 10,
        'number_of_bedroom':4,
        'number_of_beds':7,
        'bedroom_lock':true  //true or false or number_of_bathrooms
    },
    'bathrooms_are_available_to_guests':{
        'private_and_attached':5,
        'dedicated': 9,
        'shared': 4
    },
    // choose  many
    'else_might_be_there': ["Me","My_family","Other_guests","Roommates"],
    // choose  many
    'tell_guest_what_your_place_offer_function':[
                                                    "Wifi",
                                                    "TV",
                                                    "Kitchen",
                                                    "Washer",
                                                    "Free_parking_on_premises",
                                                    "Paid_parking_on_premises",
                                                    "Air_conditioning",
                                                    "Dedicated_workspace",
                                                    "Pool",
                                                    "Hot_tub",
                                                    "Patio",
                                                    "BBQ_grill",
                                                    "Outdoor_dining_area",
                                                    "Fire_pit",
                                                    "Pool_table",
                                                    "Indoor_fireplace",
                                                    "Piano",
                                                    "Exercise_equipment",
                                                    "Lake_access",
                                                    "Beach_access",
                                                    "Ski_in_Ski_out",
                                                    "Outdoor_shower",
                                                    "Smoke_alarm",
                                                    "First_aid_kit",
                                                    "Fire_extinguisher",
                                                    "Carbon_monoxide"
                                                ],

    'imageUrls':['https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720'],
    //choose 2
    'describe_hotel':[
        "Charming",
        "Hip",
        "Stylish",
        "Upscale",
        "Central",
        "Unique"
    ],
    'description': 'This is the new description.',
    // 'approve_your_first_5_booking'
    // 'use_instant_book'
    'pick_your_booking_settings':'approve_your_first_5_booking',
    // 'any_airbnb_guest'
    // 'an_experienced_guest'
    'choose_who_to_welcome_for_your_first_reservation': 'any_airbnb_guest',
    // 'new_listing_promotion'
    // 'weekly_discount'
    // 'monthly_discount'
    // choose many
    'add_discount': ['new_listing_promotion','weekly_discount'],
    // exterior_security_camera need a message
    // {'exterior_security_camera':{'message':'Hi guys'}}
    // 'noise_decibel_monitor'
    // 'weapons_on_property'
    'share_safety_details': [{'exterior_security_camera':{'message':'Hi guys'}},'weapons_on_property']
}

let aa ={
    "choose_place": "Hotel",
    "place_guest_will": "a_room",
    'address':{
      'unitLevelValue' :'10A',
      'buildingNameValue'    : 'Sunrise Towers',
      'streetAddressValue'   : '123 Mango St.',
      'brgyDistrictValue'    : 'Lapuz',
      'cityMunicipalityValue': 'Iloilo City',
      'postalCodeValue'      : '5000',
      'provinceValue'        : 'Iloilo',
    },
    "how_many_people_can_stay_here": {
      "number_of_guests": 3,
      "number_of_beds": 1,
      "number_of_bedroom": 3,
      "bedroom_lock": false
    },
    "bathrooms_are_available_to_guests": {
      "private_and_attached": 1,
      "dedicated": 1,
      "shared": -1
    },
    "else_might_be_there": [
      "Roommates"
    ],
    "tell_guest_what_your_place_offer_function": [
      "Kitchen"
    ],
    'imageUrls':['https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720'],
    
    "describe_hotel": [
      "Upscale"
    ],
    "description": "3",
    "pick_your_booking_settings": "use_instant_book",
    "choose_who_to_welcome_for_your_first_reservation": "an_experienced_guest",
    "add_discount": [
      "weekly_discount",
      "monthly_discount"
    ],
    "share_safety_details": [
      "noise_decibel_monitor"
    ]
  }
let data_final2 = {
    'choose_place': 'House',
    // "a_room"
    // "a_shared_room_in_a_hostel"
    'place_guest_will' : 'a_shared_room_in_a_hostel',
    'address':{
      'unitLevelValue' :'10A',
      'buildingNameValue'    : 'Sunrise Towers',
      'streetAddressValue'   : '123 Mango St.',
      'brgyDistrictValue'    : 'Lapuz',
      'cityMunicipalityValue': 'Iloilo City',
      'postalCodeValue'      : '5000',
      'provinceValue'        : 'Iloilo',
    },
    'how_many_people_can_stay_here':{
        'number_of_guests': 10,
        'number_of_beds':7,
        'number_of_bathrooms':4 //true or false or number_of_bathrooms
    },
    // choose  many
    'tell_guest_what_your_place_offer_function':[
                                                    "Wifi",
                                                    "TV",
                                                    "Kitchen",
                                                    "Washer",
                                                    "Free_parking_on_premises",
                                                    "Paid_parking_on_premises",
                                                    "Air_conditioning",
                                                    "Dedicated_workspace",
                                                    "Pool",
                                                    "Hot_tub",
                                                    "Patio",
                                                    "BBQ_grill",
                                                    "Outdoor_dining_area",
                                                    "Fire_pit",
                                                    "Pool_table",
                                                    "Indoor_fireplace",
                                                    "Piano",
                                                    "Exercise_equipment",
                                                    "Lake_access",
                                                    "Beach_access",
                                                    "Ski_in_Ski_out",
                                                    "Outdoor_shower",
                                                    "Smoke_alarm",
                                                    "First_aid_kit",
                                                    "Fire_extinguisher",
                                                    "Carbon_monoxide"
                                                ],

    'imageUrls':['https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720'],
    //choose 2
    'describe_hotel':[
        "Charming",
        "Hip",
        "Stylish",
        "Upscale",
        "Central",
        "Unique"
    ],
    'description': 'This is the new description.',
    // 'approve_your_first_5_booking'
    // 'use_instant_book'
    'pick_your_booking_settings':'approve_your_first_5_booking',
    // 'any_airbnb_guest'
    // 'an_experienced_guest'
    'choose_who_to_welcome_for_your_first_reservation': 'any_airbnb_guest',
    // 'new_listing_promotion'
    // 'weekly_discount'
    // 'monthly_discount'
    // choose many
    'add_discount': ['new_listing_promotion','weekly_discount'],
    // exterior_security_camera need a message
    // {'exterior_security_camera':{'message':'Hi guys'}}
    // 'noise_decibel_monitor'
    // 'weapons_on_property'
    'share_safety_details': [{'exterior_security_camera':{'message':'Hi guys'}},'weapons_on_property']
}

let data_final3 = {
    'choose_place': 'House',
    // "a_entire_place"
    // "a_room"
    // "a_shared_room_in_a_hostel"
    'place_guest_will' : 'a_entire_place',
    'address':{
      'unitLevelValue' :'10A',
      'buildingNameValue'    : 'Sunrise Towers',
      'streetAddressValue'   : '123 Mango St.',
      'brgyDistrictValue'    : 'Lapuz',
      'cityMunicipalityValue': 'Iloilo City',
      'postalCodeValue'      : '5000',
      'provinceValue'        : 'Iloilo',
    },
    'how_many_people_can_stay_here':{
        'number_of_guests': 10,
        'number_of_bedroom':4,
        'number_of_beds':7,
        'number_of_bathrooms':3  //true or false or number_of_bathrooms
    },
    'bathrooms_are_available_to_guests':{
        'private_and_attached':5,
        'dedicated': 9,
        'shared': 4
    },
    // choose  many
    'else_might_be_there': ["Me","My_family","Other_guests","Roommates"],
    // choose  many
    'tell_guest_what_your_place_offer_function':[
                                                    "Wifi",
                                                    "TV",
                                                    "Kitchen",
                                                    "Washer",
                                                    "Free_parking_on_premises",
                                                    "Paid_parking_on_premises",
                                                    "Air_conditioning",
                                                    "Dedicated_workspace",
                                                    "Pool",
                                                    "Hot_tub",
                                                    "Patio",
                                                    "BBQ_grill",
                                                    "Outdoor_dining_area",
                                                    "Fire_pit",
                                                    "Pool_table",
                                                    "Indoor_fireplace",
                                                    "Piano",
                                                    "Exercise_equipment",
                                                    "Lake_access",
                                                    "Beach_access",
                                                    "Ski_in_Ski_out",
                                                    "Outdoor_shower",
                                                    "Smoke_alarm",
                                                    "First_aid_kit",
                                                    "Fire_extinguisher",
                                                    "Carbon_monoxide"
                                                ],

    'imageUrls':['https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720','https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=720'],
    //choose 2
    'describe_hotel':[
        "Charming",
        "Hip",
        "Stylish",
        "Upscale",
        "Central",
        "Unique"
    ],
    'description': 'This is the new description.',
    // 'approve_your_first_5_booking'
    // 'use_instant_book'
    'pick_your_booking_settings':'approve_your_first_5_booking',
    // 'any_airbnb_guest'
    // 'an_experienced_guest'
    'choose_who_to_welcome_for_your_first_reservation': 'any_airbnb_guest',
    // 'new_listing_promotion'
    // 'weekly_discount'
    // 'monthly_discount'
    // choose many
    'add_discount': ['new_listing_promotion','weekly_discount'],
    // exterior_security_camera need a message
    // {'exterior_security_camera':{'message':'Hi guys'}}
    // 'noise_decibel_monitor'
    // 'weapons_on_property'
    'share_safety_details': [{'exterior_security_camera':{'message':'Hi guys'}},'weapons_on_property']
}
hotel_listing(aa);