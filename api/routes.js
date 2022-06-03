
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'

import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { addBook, getAllBooks, bookDetail } from './modules/books.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})



router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		saveFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		context.response.status = 400
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
})




// adding a book
router.post('/api/books/add', async context => {
	console.log('POST /api/books/add')
	const token = context.request.headers.get('Authorization')
	
	try {
		console.log("add book")
		const credentials = extractCredentials(token)
		const { user, pass } = credentials
		console.log('username is : ' + user)
		const body = await context.request.body()
		const data = await body.value


		console.log("Data going into SQL Database ADD BOOK: ")
		console.log(data)
		const res = await addBook(data,user)
		if(res == 1){
			const msg = `Quantity of book with ISBN_Number : ${data.isbn_num} has been updated`
			context.response.body = JSON.stringify(msg,null,2)
			return
		}
		context.response.body = JSON.stringify("Book has been succesfully added",null,2)
		// error message
		} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})



// getting all books and adding to the database
router.get('/api/books/stockLevel', async context => {
	console.log('GET /api/books/stockLevel')
	const token = context.request.headers.get('Authorization')

	try {
		console.log("gettin all books")
		const data = await getAllBooks()                                    // getALLBooks
		context.response.body = JSON.stringify(data, null, 2)

	// error message	
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.get('/api/books/home', async context => {
	console.log('GET /api/books/home')
	
	try {
		console.log("gettin all books")
		const data = await getAllBooks()                                    // getALLBooks
		context.response.body = JSON.stringify(data, null, 2)

	// error message	
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})


router.put('/api/books', async context => {
    console.log('PUT /api/books')
    
    try {
        const token = context.request.headers.get('Authorization')
        console.log(`auth: ${token}`)

        console.log("Updating single book")

        context.response.body = JSON.stringify ({
            "books": [
            {
                "bookName": "Baljot's book",
                "authourName": "Singh"
            }
            ]
        })
    } catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

// // adding books
// router.put('/api/books', async context => {
// 	console.log('PUT /api/books')

// 	try {
// 		const token = context.request.headers.get('Authorization')
// 		console.log(`auth: ${token}`)
// 		console.log("Updating a single book")

// 		context.response.body = JSON.stringify([{
// 				bookID: 1,
// 				bookName: '48 laws of power',
// 				authorName: 'Baljot Singh',
// 				datePublish: '11/03/22' 
// },
// {
// 				bookID: 2,
// 				bookName: 'power rangers',
// 				authorName: 'Baljot Singh',
// 				datePublish: '10/03/22'
// },
// {
// 				bookID: 3,
// 				bookName: 'Bad bois for life',
// 				authorName: 'Baljot Singh',
// 				datePublish: '09/03/22'
// },
// {
// 				bookID: 4,
// 				bookName: 'Tom and Jerry',
// 				authorName: 'Baljot Singh',
// 				datePublish: '08/03/22'
// }]

// )
// 	} catch(err) {
// 		context.response.status = 401
// 		context.response.body = JSON.stringify(
// 			{
// 				errors: [
// 					{
// 						title: '401 Unauthorized.',
// 						detail: err.message
// 					}
// 				]
// 			}
// 		, null, 2)
// 	}
// })


// Deleting a book from the database
router.delete('/api/books/delete', async context => {
	console.log('DELETE /api/books')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
	
		console.log("deleting a book")
		context.response.body = JSON.stringify ({
			"books": [
				{
					success: true,
					msg: "Book removed",
				}
			]
		})
        console.log(data)
	// error message	
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})


//adding all books to database
router.get('/api/bookDetail/:id', async context => {
	const id = context.params.id
	console.log('GET /api/bookDetail')
	const token = context.request.headers.get('Authorization')
	const {user, password} = extractCredentials(token)
	try {
		const credentials = extractCredentials(token)
		const { user, pass } = credentials
		console.log('bookname is : ' + user)
		console.log("getting book detail")

		const data = await bookDetail(id)
		console.log(data)
		context.response.body = JSON.stringify(data, null, 2)

	    // error message	
	    } catch(err) {
  context.response.status = 401
  context.response.body = JSON.stringify(
   {
    errors: [
     {
      title: '401 Unauthorized.',
      detail: err.message
     }
    ]
   }
  , null, 2)
 }
})






router.get("/(.*)", async context => {      
// 	const data = await Deno.readTextFile('static/404.html')
// 	context.response.body = data
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

export default router

