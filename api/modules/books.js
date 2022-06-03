
// books.js

import { db } from './db.js'
import {saveFile} from './util.js'

export async function getAllBooks() {
    console.log("FUNCTION / getAllBooks DB")
    try{

        const sql = `SELECT * FROM books;`
        const allBooks = await db.query(sql)
        console.log("DATA OF ALL BOOKS:")
        console.log(allBooks)

        if(allBooks.length == 0){
            return JSON.stringify("")
        }
        console.log(allBooks[0])
        return allBooks
    
    }catch(err){
        console.log(err.message)
    }
}

export async function addBook(data, username) {
    try{
        console.log("Adding book to DB")
        // const sql = `SELECT ISBNnumber FROM accounts WHERE user = "${username}"`
        // let getISBNnumber = await db.query(sql)
        // console.log(getISBNnumber)
    
        const img_name = saveFile(data.file.base64, username)
        const res = await check_duplicates(data.isbn_num, data.quantity)
        if(res == 1){
            console.log("DUPLICATES IS TRUEEEEEEE")
            return 1
        }

        const sql2 = `INSERT INTO books(ISBN_Number,bookName,authorName,publishDate,bookDescription,img_name, trade_price,retail_price,quantity)\
        VALUES("${data.isbn_num}","${data.bookName}","${data.authorName}","${data.publishDate}","${data.bookDescription}",\
        "${img_name}","${data.trade_price}","${data.retail_price}","${data.quantity}")`
        await db.query(sql2)
        return false

    }catch(err){
        console.log(err.message)
    }
}


export async function check_duplicates(isbn_num,quantity){
    let sql = `SELECT count(ISBN_Number) AS count FROM books WHERE ISBN_Number= "${isbn_num}";`
    const result = await db.query(sql)
    console.log("MAAAAABETTTHTHT")
    console.log(result)
    if(result[0].count > 0){

        //get the current book count
        sql = `SELECT quantity FROM books WHERE ISBN_Number= "${isbn_num}";`
        const current_quantity = await db.query(sql)
        console.log("UPDATEDINGGGGGGGG BOOKS Quantity")
        console.log(current_quantity)

        //append the current count with the new count of books 
        const new_quantity = parseInt(quantity) + parseInt(current_quantity[0].quantity)
        sql = `UPDATE books SET quantity = "${new_quantity}" WHERE ISBN_Number = "${isbn_num}";`
        await db.query(sql)
        return 1
    }

    return -1

}

export async function bookDetail(BookID) {
    try{
        const sql2 = `SELECT * FROM books WHERE ISBNnumber = "${BookID}"`
        const data = await db.query(sql2)
        console.log(data)
        return data[0]

    }catch(err){
        console.log(err.message)
    }
}


export default {addBook}