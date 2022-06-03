
/* addBook.js */
import {customiseNavbar, file2DataURI, loadPage, secureGet, showMessage } from '../util.js'

export async function setup(node) {
	console.log('AddBook: setup')
	try {
        const token = localStorage.getItem('authorization')
		//console.log(node)
		document.querySelector('header p').innerText = 'Add New Book'
		customiseNavbar(['home', 'logout', 'stockLevel'])
        const paragraph = node.querySelector('p')

        const button_add = node.getElementById("addBook")
        console.log("WAAAATEEEEERRRR")

        // trade slider
        // var slider1 = node.getElementById("tradeSlider");
        // var output1 = node.getElementById("tradeSliderOut");
        // output1.innerText = slider1.value;
        // slider1.oninput = function(){
        //     output1.innerText = this.value;
        // }

        // // retail slider
        // var slider2 = node.getElementById("retailSlider");
        // var output2 = node.getElementById("retailSliderOut");
        // output2.innerText = slider2.value;
        // slider2.oninput = function(){
        //     output2.innerText = this.value;
        // }

        // // quanity slider
        // var slider3 = node.getElementById("quanitySlider");
        // var output3 = node.getElementById("quanitySliderOut");
        // output3.innerText = slider3.value;
        // slider3.oninput = function(){
        //     output3.innerText = this.value;
        // }
        
        button_add.addEventListener('submit', async ()=>{
                event.preventDefault()
                console.log('Food')
            
                const formData = new FormData(event.target)
                const data = Object.fromEntries(formData.entries())
               // console.log(data)
                const file = document.querySelector('input[name="file"]').files[0]
                data.file.base64 = await file2DataURI(file)
                console.log("BASE64 HERE:")
                console.log(data.file.base64)

                console.log("AKKSHAYY KUUMAAARRR")
                console.log(data)
                const url = '/api/books/add'
                
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/vnd.api+json',
                        'Authorization': token
                    },
                    body: JSON.stringify(data)
                }

                const response = await fetch(url, options)
                const json = await JSON.stringify(response)
                console.log(json)
                showMessage('new book added')
                loadPage('addBook')
        })
    
    if(localStorage.getItem('authorization') === null) loadPage('addBook')

    }catch(err) {
        console.error(err)
    }
}


// async function AddBook() {
// 	event.preventDefault()
//     const formData = new FormData(event.target)
// 	const data = Object.fromEntries(formData.entries())
//     console.log(data)
// 	const url = '/api/getBooks'
// 	const options = {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/vnd.api+json'
// 		},
// 		body: JSON.stringify(data)
// 	}
// 	const response = await fetch(url, options)
// 	const json = await response.json()
// 	console.log(json)
// 	showMessage('new book uploaded')
// 	loadPage('addBooks')
// }




// 		there is a token in localstorage
//        const button = node.getElementById('addBook')
    


//     async function addBook() {
//         event.preventDefault()
//         const.formData = new FormData(event.target)
//         const data = Object fromEntries(formData.entries())
//         console.log(data)
//         const url = '/api/getBooks'
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type:' 'application/vnd.api+json'
//             },
//             body: JSON.stringify(data)
//         }
//         const response = await.fetch(url, options)
//         const json = await response.json()
//         console.log(json)
//         showMessage('new book added')
//         loadPage('AddBook')
//     }
// }