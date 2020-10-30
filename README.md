# Raycipee


Raycipee

# POST /api/v1/auth/create-user 

by providing the information bellow
{
    "fname" : "Employee firstname",
     "lname" : "Emplyee last Name",
     "username": "user",
     "password": "*****",
     "email": "email@me.com",
     "address": "Kaduna",   
     "sex": "Male",
     "phone": "Phone number"
}

Employees can access their account by loggin their inofmation throug the api bellow

  #  POST /api/v1/auth/signin 

by providing the information bellow
{
     "password": "*****",
     "email": "email@me.com",
}

    where the will be provided by access token on success.
    the key to the access token is 'x-access-token' 

 Employess can post gif  through this end point

 
 
# # Delete your recipe
#  DELETE /api/v1/recipe/:id 
     
      
# View an all recipes 
# GET /api/v1/recipe 


# View an all recipes posted by user 
# GET /api/v1/recipe 
# token reqquiired

# view a particular recipe
# GET /api/v1/recipe/:id


# delete a particular recipe 
# /api/v1/recipe/:id
# token required


# Post recipe
#  POST /api/v1/ingredients

By providing their token in the header, the recipe id and submitting 

{
    "name": "nam of ingredient",
    "quantity": "quantity of ingredient",
    "receipeid": "id of recipe"
    }

# view allingredient of a recipe
#  /api/v1/ingredients/:id

# update ingredient
# /api/v1/ingredients/:id
# ingredient id

# delete ingredient
# DELETE /api/v1/ingredients/:id

# post procedures step by step
# POST /api/v1/step
By providing their token in the header, the recipe id and submitting 

{
      
      "recipeid": " recipe id integer",
      "stepno": "step no (integer) ",
      "step": "step summary",
      "description": " step description ",
      "duration": " time taken for that step in minute (integer)",
      "imgurl": " step img url"
    }

# view all step for a recipe
# /api/v1/steps/:id
# recipe id

# delete step
# DELETE '/api/v1/step/:id
# step id
