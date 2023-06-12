var UserService = {
  init: function () {
    $("#login-button").click(function () {
      UserService.validateLogin();
    });

  },

  validateLogin: function () {
    $('#login-form').validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries((new FormData(form)).entries());
        console.log(entity);
        $.ajax({
          url: 'login',
          type: 'POST',
          data: JSON.stringify(entity),
          contentType: "application/json",
          dataType: "json",
          success: function (response) {

            localStorage.setItem("token", response.token);
            // UserService.showUserNavbar();
            BookService.list();
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
                    <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                  </div>
                  <form id="login-form">
                      <div class="mb-3">
                          <label for="username" class="form-label" id="username">Username</label>
                          <input type="text" class="form-control required" id="username" name="username">
                      </div>
                      <div class="mb-3">
                          <label for="password" class="form-label" id="password">Password</label>
                          <input type="password" class="form-control required" id="password" name="password">
                      </div>
                      <button type="submit" class="btn btn-primary" id = "button" onclick="UserService.validateLogin()">Submit</button>
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

  parseJWT: function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return (JSON.parse(jsonPayload));
  },
}
