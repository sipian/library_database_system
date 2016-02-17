
module.exports=function(dateOfPurchase,title,author,copies,issuable,publisher,place,genre,edition,status,year,pages,booksource,bill,cost,desc){
return{
	books_data:function(callback){
		var mysql = require("mysql");
		var validator = require("validator");
		var fs=require('fs');
		var dbclient=mysql.createConnection({
			host:"localhost",
			user:"headlibrarian",
			password:"password",
			database:"library",
			debug:true,
			
			
		});
		
		// checking for null in input 
		dbclient.connect();
		

		//sanitizing input
		dateOfPurchase=validator.escape(dateOfPurchase);
		dateOfPurchase=validator.trim(dateOfPurchase);
		dateOfPurchase=validator.stripLow(dateOfPurchase,false);
		copies=validator.escape(copies);
		copies=validator.trim(copies);
		copies=validator.stripLow(copies,false);
		edition=validator.escape(edition);
		edition=validator.trim(edition);
		edition=validator.stripLow(edition,false);
		year=validator.escape(year);
		year=validator.trim(year);
		year=validator.stripLow(year,false);
		pages=validator.escape(pages);
		pages=validator.trim(pages);
		pages=validator.stripLow(pages,false);
		cost=validator.escape(cost);
		cost=validator.trim(cost);
		cost=validator.stripLow(cost,false);
		cost = parseFloat(cost);
		if(cost!=NaN)
			cost=Math.round(cost * 100.0) / 100.0;

		title=validator.escape(title);
		title=validator.trim(title);
		title=validator.stripLow(title,false);
		author=validator.escape(author);
		author=validator.trim(author);
		author=validator.stripLow(author,false);
		publisher=validator.escape(publisher);
		publisher=validator.trim(publisher);
		publisher=validator.stripLow(publisher,false);
		place=validator.escape(place);
		place=validator.trim(place);
		place=validator.stripLow(place,false);
		genre=validator.escape(genre);
		genre=validator.trim(genre);
		genre=validator.stripLow(genre,false);
		status=validator.escape(status);
		status=validator.trim(status);
		status=validator.stripLow(status,false);
		booksource=validator.escape(booksource);
		booksource=validator.trim(booksource);
		booksource=validator.stripLow(booksource,false);
		bill=validator.escape(bill);
		bill=validator.trim(bill);
		bill=validator.stripLow(bill,false);
		desc=validator.escape(desc);
		desc=validator.trim(desc);
		if(issuable==undefined)
			issuable = "No";
		if(year=="")
			year = '\\N';
		if(place=="")
			place = '\\N';
		if(pages=="")
			pages = '\\N';
		if(edition=="")
			edition = '\\N';
		if(desc=="")
			desc = '\\N';
		//desc=validator.stripLow(desc,false);		
			
				var unique_id="";
				var answer_to_send_back = [];
				var query_for_sql ="select max(CONVERT (substring(book_id,4),UNSIGNED INTEGER)) as maximum_id from books";
				dbclient.query(query_for_sql,function(err,rows,fields){
					if(err)
						callback(err);
					else
					{
						//console.log("id : "+rows[0].maximum_id);
						var unique_id_number = parseInt(rows[0].maximum_id);
						var genre_string = genre.substr(0,3);
						var query_in_txt_for_books = "";
						var query_in_txt_for_account = "";
						for(var t=1;t<=copies;t++)
						{
							unique_id = genre_string + (unique_id_number+1).toString();
							answer_to_send_back.push(unique_id);
							unique_id_number= unique_id_number +1;
							var query_in_txt_for_books =query_in_txt_for_books+ unique_id + "\t" + title + "\t" + author + "\t" + issuable + "\t" + publisher + "\t" + place + "\t" + genre + "\t" + edition + "\t" + year + "\t" + pages + "\t" + desc + "\n";
							var query_in_txt_for_account =query_in_txt_for_account + unique_id + "\t" + dateOfPurchase + "\t" + cost + "\t" + status + "\t" + bill + "\t" + booksource + "\n" ;
						}
						fs.writeFile('./file_for_upload_book_data.txt',query_in_txt_for_books,function(err){
							if(err)callback("Error while writing to file file_for_upload_book_data.txt : "+err);
						});
						fs.writeFile('./file_for_upload_account_data.txt',query_in_txt_for_account,function(err){
							if(err)callback("Error while writing to file file_for_upload_account_data.txt : "+err);
						});

					query_for_sql = "LOAD DATA LOCAL INFILE 'file_for_upload_book_data.txt' into table books";
					dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)callback(err);
					});
					query_for_sql = "LOAD DATA LOCAL INFILE 'file_for_upload_account_data.txt' into table accounts";
					dbclient.query(query_for_sql,function(err,rows,fields){
							if(err)callback(err);
							else
							{dbclient.end();		
												callback(null,answer_to_send_back);}
					});
					}
					
					
				});
		
	
	
},
	
trial:function(){
	var a=['car','is','hot'];
	return a;}
}
}	
