# Teamwork
[![Build Status](https://travis-ci.org/nerjib/Teamwork.svg?branch=master)](https://travis-ci.org/nerjib/Teamwork)  <a href='https://coveralls.io/github/nerjib/Teamwork?branch=testfile'><img src='https://coveralls.io/repos/github/nerjib/Teamwork/badge.svg?branch=testfile' alt='Coverage Status' /></a>


Teamwork is an internal social network for employees of an organization. The goal of this                              
application is to facilitate more interaction between colleagues and promote team bonding. 

Only admin can create account for other users. He can do so through the api bellow.

# POST https://powerful-castle-53749.herokuapp.com/api/v1/auth/create-user 

by providing the information bellow
{
    "fname" : "Employee firstname",
     "lname" : "Emplyee last Name",
     "username": "user",
     "password": "*****",
     "email": "email@me.com",
     "role": "staff",
     "dept": "IT",
     "address": "KD",    
    }

Employees can access their account by loggin their inofmation throug the api bellow

  #  POST https://powerful-castle-53749.herokuapp.com/api/v1/auth/signin 

by providing the information bellow
{
     "password": "*****",
     "email": "email@me.com",
    }

    where the will be provided by access token on success.
    the key to the access token is 'x-access-token' 

 Employess can post gif  through this end point

#  POST https://powerful-castle-53749.herokuapp.com/api/v1/gifs 

By providing their token in the header. and submitting a file with with name='image'
and title
 

# Comment on gif
#  POST https://powerful-castle-53749.herokuapp.com/api/v1/gifs/:id/comments

{
          "comment": "Put comment here"
}


# view all  gif
#  GET https://powerful-castle-53749.herokuapp.com/api/v1/gifs/:id/comments


# Delete gif
# POST https://powerful-castle-53749.herokuapp.com/api/v1/gifs/:id


# Post articles
#  POST https://powerful-castle-53749.herokuapp.com/api/v1/articles 

By providing their token in the header. and submitting 

{
    
     "title": "Areticle title",
      "article": "Article note",
    
    }
 
 # Update article articles
#  Put https://powerful-castle-53749.herokuapp.com/api/v1/articles/:id 

By providing their token in the header, the article id and submitting 

{
    
     "title": "Areticle title",
      "article": "Article note",
    
    }
 
# # Delete your articles
#  DELETE https://powerful-castle-53749.herokuapp.com/api/v1/articles/:id 
     
      
# View an article and the comments under it
# GET https://powerful-castle-53749.herokuapp.com/api/v1/articles/:id 

 
 # Comment on articles
#  Post https://powerful-castle-53749.herokuapp.com/api/v1/articles/:id/comments 

By providing their token in the header, the article id and submitting 

{
    
      "comment": "comment note",
    
    }


#  view all articles
#  Get https://powerful-castle-53749.herokuapp.com/api/v1/feeds

By providing their token in the header, the article id and submitting 

{
    
      "comment": "comment note",
    
    }