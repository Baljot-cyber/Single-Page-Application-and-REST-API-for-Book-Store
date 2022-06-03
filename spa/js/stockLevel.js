
/* stockLevels */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('STOCK LEVELS: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Stock Level'
		customiseNavbar(['home', 'logout'])
        const token = localStorage.getItem('authorization')
        console.log(token)
        if(token == null) customiseNavbar(['home', 'register', 'login'])

        await addContent(node)

        } catch(err) {
            console.error(err)
        
        }
}

// load data from JSON file stored in directory
async function addContent(node) {
    const token = localStorage.getItem('authorization')
    const url =  '/api/books/stockLevel'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'authorization' : token
        }
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const template = document.querySelector('template#stockLevel')
    console.log("WORKING")
    console.log(data)
    

    for(const book of data){
        const fragment = template.content.cloneNode(true)

        let bookCover = fragment.querySelector('img')
        
        bookCover.src = `${window.location.origin}/uploads/${book.img_name}` 

        let bookName = fragment.getElementById("bookName")
        bookName.innerText = book.bookName

        let ISBNnumber = fragment.getElementById("ISBNnumber")
        ISBNnumber.innerText = book.ISBN_Number

        let quantity = fragment.getElementById("quantity")
        quantity.innerText = book.quantity

        

        node.appendChild(fragment)
    }
}



	// event.preventDefault()
    // const formData = new FormData(event.target)
	// const data = Object.fromEntries(formData.entries())
    // console.log(data)
	// const url = '/api/getBook'
	// const options = {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/vnd.api+json'
	// 	},
	// 	body: JSON.stringify(data)
	// }
	// const response = await fetch(url, options)
	// const json = await response.json()
	// console.log(json)
	// showMessage('new book uploaded')
	// loadPage('addBook')
