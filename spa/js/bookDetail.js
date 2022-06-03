/* bookDetail */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
    console.log('HOME: setup')
    try {
        console.log(node)
        console.log('Book detail page')
        document.querySelector('header p').innerText = 'Book detail'
        customiseNavbar(['home', 'addBook'])
        const token = localStorage.getItem('authorization')
        console.log(token)
        if(token === null) customiseNavbar(['home', 'register', 'login'])
        await addContent(node)
    } catch(err) {
        console.error(err)
    }
}

// load data from JSON to directory
async function addContent(node) {
    const token = localStorage.getItem('authorization')
    console.log("File Path")
    console.log(window.location.pathname)
    const path = window.location.pathname
    const split = path.split('_')

    const url = `/api/bookDetail/${split[1]}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'authorization': token
        }
    }
    const response = await fetch(url, options)
    const book = await response.json()
    const template = document.querySelector('template#bookDetail')
    console.log("Hello")
    console.log(book)

    let bookName = node.bookName("bookName")
    bookName.innerText = book.bookName

    let authorName = node.authorName("authorName")
    authorName.innerText = book.authorName

    let publishDate = node.publishDate("publishDate")
    publishDate.innerText = book.publishDate

    let bookDescription = node.bookDescription("bookDescription")
    bookDescription.innerText = bookDescription

    let img_name = node.bookName("img_name")
    img_name.src = `${windows.location.orgin}/uploads/${book.picture_name}`

}

// ISBNnumber INTEGER,
//     bookName VARCHAR(100),
//     authorName TEXT,
//     publishDate DATE,
//     bookDescription VARCHAR(100),
//     img_name TEXT,
//     tradeSlider INTEGER,
//     retailSlider INTEGER,
//     quanitySlider INTEGER,