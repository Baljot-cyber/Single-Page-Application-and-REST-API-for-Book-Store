
/* home.js */

import { customiseNavbar } from '../util.js'


export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'register', 'login']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'register', 'login']) //navbar if logged out

		await addContent(node)
	} catch(err) {
		console.error(err)
	}
}

// this example loads the data from a JSON file stored in the uploads directory

async function addContent(node) {
    const token = localStorage.getItem('authorization')

    const url =  '/api/books/home'
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'authorization' : token
        }
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const template = document.querySelector('template#home')
    console.log("WORKING")
    console.log(data)
    
	let title = document.getElementById("cart_t")
	title.hidden = false

	
	let total = document.getElementById("total")
	total.hidden = false

	let items = document.getElementById("items")
	items.hidden = false

	document.getElementById("p_total").hidden = false
	document.getElementById("p_items").hidden = false

    for(const book of data){
        const fragment = template.content.cloneNode(true)

        let bookCover = fragment.querySelector('img')
        
        bookCover.src = `${window.location.origin}/uploads/${book.img_name}` 

        let bookName = fragment.getElementById("bookName")
        bookName.innerText = book.bookName

		let cart_btn = fragment.getElementById("cart")
		cart_btn.addEventListener('click', async ()=>{
			items.innerText = parseInt(items.innerText) + 1

			total.innerText = parseInt(total.innerText) + parseInt(book.retail_price)

		})
        // let ISBNnumber = fragment.getElementById("ISBNnumber")
        // ISBNnumber.innerText = book.ISBN_Number

        // let quantity = fragment.getElementById("quantity")
        // quantity.innerText = book.quantity

        

        node.appendChild(fragment)
    }
}
