const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const { pipeline } = require('stream');
const { promisify } = require('util');
const path = require('path');

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

async function number_of_bathrooms(page,bathrooms_number) {
    let bath_rooms = 1
    if(bath_rooms < bathrooms_number){
        for(let i = 0; i < (bathrooms_number * 2) - bath_rooms; i++){
            let add_beds = await page.locator('xpath=//*[@id="stepper-item--3-bathrooms-stepper"]/button[1]');
            add_beds.click();
            await page.waitForTimeout(500);
        }
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
    await choose_place.click();
    await page.waitForTimeout(2000);
    
    let next2 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // choose_place
    await next2.click();
    await page.waitForTimeout(2000);

    let place_guest_will = {
        "An_entire_place": 1,
        "A_room": 2,
        "A_shared_room_in_a_hostel": 3
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
    await number_of_bathrooms(page,3);
    console.log("number_of_bathrooms");
    await page.waitForTimeout(500);

    await page.waitForTimeout(2000);
    let next6 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // number_of_guests
    await next6.click();
    await page.waitForTimeout(2000);
    let next7 = await page.locator('button[aria-label="Next step"]').nth(0);
    await page.waitForTimeout(2000);
    // step 2
    await next7.click();
    await page.waitForTimeout(2000);

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
        await page.waitForTimeout(10000)
        
        console.log(id);
        await page.close();
};

let data_final = {
    'choose_place': 'House',
    // "a_room"
    // "a_shared_room_in_a_hostel"
    'place_guest_will' : 'A_room',
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
        'bedroom_lock':true  //true or false
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

hotel_listing(data_final);