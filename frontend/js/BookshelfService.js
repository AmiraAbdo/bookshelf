var BookshelfService = {
  init: function () {
    BookshelfService.list()
  },

  list: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    // console.log(payload);
    $.ajax({
      url: 'bookshelf/user/' + payload.iduser,
      type: 'GET',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
      },
      success: function (data) {
        SPApp.handleSectionVisibility('#bookshelf-list')
        let html = ''
        for (let i = 0; i < data.length; i++) {
          html += `
                <!--krene kartica-->
                    <div class="col">
                        <div class="card shadow-sm" style="height:100%">
                            <img src="frontend/assets/bookshelf.jpg" ></img>
                            <div class="card-body">
                                <h3>` + data[i].name + `</h3>
                                <p class="card-text">
                                    ` + data[i].description + `
                                </p>
                            </div>
                            <div class="card-footer">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="BookshelfService.getBooks(` + data[i].idbookshelf + `)">
                                        View
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick = "BookshelfService.showEdit(`+ data[i].idbookshelf + `)">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        }
        $('#bookshelf-list').html(html)
        $('#bookshelf-list').data('book', data)
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    })
  },

  getBooks: function (idbookshelf) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: 'bookshelf/books/' + idbookshelf,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
      },
      success: function (data) {
        SPApp.handleSectionVisibility('#bookshelf-book-list')
        // let html = `<div class="col">
        //   <button>unga</button>
        // </div>`;
        var html="";
        for (let i = 0; i < data.length; i++) {
          html += `
                    <!--krene kartica-->
                    
                    <div class="col">
                        <div class="card shadow-sm" style="height:100%">
                            <img src="frontend/assets/tfios.jpg" ></img>
                            <div class="card-body">
                                <h3>` + data[i].title + ` - ` + data[i].author + `</h3>
                                <p class="card-text">
                                    `+ data[i].synopsis + `
                                </p>
                            </div>
                            <div class="card-footer">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="BookService.getBookById(` + data[i].idbook + `)">
                                        View
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="BookService.showEdit(`+ data[i].idbook + `)">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        }
        $('#bookshelf-book-list').html(html)
        $('#bookshelf-book-list').data('book', data)
      }
    })
  },

  showAdd: function () {
    SPApp.handleSectionVisibility("#add-shelf");
    var html =
      `
        <div
        class="row d-flex justify-content-center align-items-center h-100"
      >
        <div class="col-xl-10">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <h4 class="mt-1 mb-5 pb-1">Add shelf</h4>
                  </div>
                  <div class="text-center row">
                    <form id="add-shelf-form">
                      <div class="text-start my-4">
                        <label
                          for="name"
                          class="form-label"
                          id="name"
                          >Name</label
                        >
                        <input
                          type="text"
                          class="form-control required"
                          id="name"
                          name="name"
                        />
                      </div>
                      <div class="text-start my-4">
                        <label
                          for="description"
                          class="form-label"
                          id="description"
                          >Description</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="description"
                          name="description"
                        />
                      </div>
                      <div>
                        <button
                            class="btn btn-danger my-2 py-3 px-4"
                            onclick="BookshelfService.list()"
                        >
                            Cancel
                        </button>
                        <button
                            class="btn my-2 py-3 px-4"
                            style="background-color: #5ee6b9"
                            onclick="BookshelfService.add()"
                        >
                            Add shelf
                        </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
    $("#add-shelf").html(html);
  },

  add: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $("#add-shelf-form").validate({
      submitHandler: function (form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        $.ajax({
          url: 'bookshelf',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
          },
          success: function (data) {
            // console.log(data);
            BookshelfService.list();
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        })
      }
    })
  },

  showEdit: function (idbookshelf) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({

      url: 'bookshelf/' + idbookshelf,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#edit-shelf");
        var html = `
                <div
                class="row d-flex justify-content-center align-items-center h-100"
              >
                <div class="col-xl-10">
                  <div class="card rounded-3 text-black">
                    <div class="row g-0">
                      <div class="col">
                        <div class="card-body p-md-5 mx-md-4">
                          <div class="text-center">
                            <h4 class="mt-1 mb-5 pb-1">Edit shelf</h4>
                          </div>
                          <div class="text-center row">
                            <form id="edit-shelf-form">
                              <div class="text-start my-4">
                                <label
                                  for="name"
                                  class="form-label"
                                  id="name"
                                  >Name</label
                                >
                                <input
                                  type="text"
                                  class="form-control required"
                                  id="name"
                                  name="name"
                                  value =  "`+ data.name + `"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label
                                  for="description"
                                  class="form-label"
                                  id="description"
                                  >Description</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="description"
                                  name="description"
                                  value =  "`+ data.description + `"
                                />
                              </div>
                              <div>
                                <button
                                    class="btn btn-danger my-2 py-3 px-4"
                                    onclick="BookshelfService.list()"
                                >
                                    Cancel
                                </button>
                                <button
                                    class="btn my-2 py-3 px-4"
                                    style="background-color: #5ee6b9"
                                    onclick="BookshelfService.update(`+ data.idbookshelf + `)"
                                >
                                    Save changes
                                </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `;
        $("#edit-shelf").html(html);
      }
    })
  },

  update: function (idbookshelf) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $("#edit-shelf-form").validate({
      submitHandler: function (form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        data.user_id = payload.iduser;
        $.ajax({
          url: 'bookshelf/' + idbookshelf,
          type: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
          },
          success: function (data) {
            // console.log(data);
            BookshelfService.list();
            // console.log(data);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log(errorThrown);
            // console.log(data);
            // console.log(idbook);
            // console.log(textStatus);
            console.log(XMLHttpRequest);
          }
        })
      }
    })
  }
}
