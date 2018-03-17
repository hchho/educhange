module.exports = {
    headerContents: function() {
        return '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + 
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + 
            '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>' + '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>' + '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>' + 
            '<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>'
    },

    logoutForm: function() {
        return '<div class="form-inline my-2 my-lg-0" id="logout-form">' + 
            '<ul class="navbar-nav mr-sm-2">' + 
            '<li class="nav-item">' + 
            '<a class="nav-link" href="/session-form">Create session</a>' + 
            '</li>' + 
            '<li class="nav-item">' + 
            '<a class="nav-link" href="/session">Manage sessions</a>' + 
            '</li>' +
            '</ul>' + 
            '<button class="btn btn-primary" id="logout" type="submit" >Logout</button>' + 
            '</div>'
    },   

    loginForm: function() {
        return '<div class="form-inline" id="login-form">' + 
            '<label for="email">Email: </label>' + 
            '<input class="form-control mr-sm-2" type="text" id="email" placeholder="Type in your email"/>' + 
            '<label for="password">Password: </label>' + 
            '<input class="form-control mr-sm-2" type="password" id="password" placeholder="Type in your password" />' + 
            '<button class="btn btn-primary" id="login" type="submit" >Login</button>' + 
            '<ul class="navbar-nav mr-sm-2">' + 
            '<li class="nav-item">' + 
            '<a class="nav-link" id="sign-up" href="/signup">Sign up</a>' + '</li>' + '</ul>' + '</div>'
    }
}