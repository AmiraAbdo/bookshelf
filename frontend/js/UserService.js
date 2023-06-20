var UserService = {
  init: function () {
    if (localStorage.getItem("token") === null) {
      UserService.guest();
    } else {
      UserService.user();
    }

  },

  validateLogin: function () {
    $('#login-form').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        $.ajax({
          url: 'src/login',
          type: 'POST',
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json",
          success: function (response) {

            localStorage.setItem("token", response.token);
            // UserService.showUserNavbar();
            UserService.user();
          },
          error: function (response) {
            console.log(response);
          }
        });

      }
    });
  },

  showLogin: function () {
    SPApp.handleSectionVisibility("#login");
    var html = `
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <h4 class="mt-1 mb-5 pb-1">Log in</h4>
                  </div>
                  <form id="login-form">
                      <div class="mbU-3">
                          <label for="username" class="form-label" id="username">Username</label>
                          <input type="text" class="form-control required" id="username" name="username">
                      </div>
                      <div class="mb-3">
                          <label for="password" class="form-label" id="password">Password</label>
                          <input type="password" class="form-control required" id="password" name="password">
                      </div>
                      <button type="button" class="btn btn-danger" id = "button" onclick="UserService.showStart()">Cancel</button>
                      <button type="submit" class="btn btn-primary" id = "button" onclick="UserService.validateLogin()">Log in</button>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex justify-content-center">
                <img
                  src="frontend/assets/frog.png"
                  class="img-fluid"
                  style="padding: 5%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      `;
    $("#login").html(html);
  },

  validateRegister: function () {
    $('#register-form').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        $.ajax({
          url: 'src/register',
          type: 'POST',
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json",
          success: function (response) {

            localStorage.setItem("token", response.token);
            // UserService.showUserNavbar();
            UserService.user();
            console.log("ha?")
          },
          error: function (XMLHttpRequest, response) {
            console.log(XMLHttpRequest);
          }
        });

      }
    });
  },

  showRegister: function () {
    SPApp.handleSectionVisibility("#register");
    var html = `
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <h4 class="mt-1 mb-5 pb-1">Register</h4>
                  </div>
                  <form id="register-form">
                      <div class="mbU-3">
                        <label for="email" class="form-label" id="email">Email</label>
                        <input type="email" class="form-control required" id="email" name="email">
                      </div>
                      <div class="mbU-3">
                          <label for="username" class="form-label" id="username">Username</label>
                          <input type="text" class="form-control required" id="username" name="username">
                      </div>
                      <div class="mb-3">
                          <label for="password" class="form-label" id="password">Password</label>
                          <input type="password" class="form-control required" id="password" name="password">
                      </div>
                      <button type="button" class="btn btn-danger" id = "button" onclick="UserService.showStart()">Cancel</button>
                      <button type="submit" class="btn btn-primary" id = "button" onclick="UserService.validateRegister()">Register</button>
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex justify-content-center">
                <img
                  src="frontend/assets/frog.png"
                  class="img-fluid"
                  style="padding: 5%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      `;
    $("#register").html(html);
  },

  parseJWT: function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return (JSON.parse(jsonPayload));
  },

  user: function () {
    $("#guest-navbar").hide();
    $("#user-navbar").show();
    BookService.list();
    $("#section").show();
  },

  guest: function () {
    $("#guest-navbar").show();
    $("#user-navbar").hide();
    UserService.showStart();
    $("#section").hide();
  },

  logout: function () {
    localStorage.clear();
    UserService.guest();
    console.log(localStorage.getItem('token'));
  },

  /**
   * potencijalno promijenit ovo dole da uzme show i validate form
   */

  showStart: function () {
    SPApp.handleSectionVisibility("#start");
    var html = `
    <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-xl-10">
      <div class="card rounded-3 text-black">
        <div class="row g-0">
          <div class="col-lg-6">
            <div class="card-body p-md-5 mx-md-4">
              <div class="text-center">
                <h4 class="mt-1 mb-5 pb-1">Welcome!</h4>
              </div>
              <div class="text-center row">
              <button
                class="btn my-4 py-3"
                style="background-color: #5ee6b9"
                onclick="UserService.showLogin()"
              >
                log in
              </button>
              <button
                class="btn my-4 py-3"
                style="background-color: #5ee6b9"
                onclick="UserService.showRegister()"
              >
                register
              </button>
            </div>
            </div>
          </div>
          <div class="col-lg-6 d-flex justify-content-center">
            <img
              src="frontend/assets/frog.png"
              class="img-fluid"
              style="padding: 5%"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

    `;
    $("#start").html(html);
  }
}
