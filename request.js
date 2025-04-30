const functionName = ['get_title','get_property_type']//, 'get_pricing','get_availability','get_number_of_guest']; // example name

fetch('http://localhost:3000/airbnb/scraper', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify([functionName])
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('Request failed:', err));

// fetch('http://localhost:3000/airbnb/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"email":"justindelavega00@gmail.com", "password":"Emjaycee83849724"})
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Request failed:', err));

// fetch('http://localhost:3000/airbnb/postToFacebook', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(
//         {
//             "url": "1046291836187649",
//             "feelingEmoji": "cool",
//             "textPost": "This is a test post",
//             "file": "Screenshot From 2025-01-28 22-16-55.png"
//         }
//     )
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.error('Request failed:', err));