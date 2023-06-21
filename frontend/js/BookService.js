var BookService = {
  init: function () {
    BookService.list();
  },

  list: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: 'src/book',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#book-list");
        var html = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].img === null) {
            data[i].img = 'qm.png';
          }
          html += `<!--krene kartica-->
                        <div class="col">
                            <div class="card shadow-sm" style="height:100%">
                                <img src="frontend/assets/`+ data[i].img + `" ></img>
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
                    `;
        }
        $("#book-list").html(html);
        $("#book-list").data("book", data);
      }
    })
  },

  showAdd: function () {
    SPApp.handleSectionVisibility("#add-book");
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
                            <h4 class="mt-1 mb-5 pb-1">Add book</h4>
                          </div>
                          <div class="text-center row">
                            <form id="add-book-form">
                              <div class="text-start my-4">
                                <label for="title" class="form-label" id="title"
                                  >Title</label
                                >
                                <input
                                  type="text"
                                  class="form-control required"
                                  id="title"
                                  name="title"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label for="author" class="form-label" id="author"
                                  >Author</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="author"
                                  name="author"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label for="year" class="form-label" id="year"
                                  >Year</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  id="year"
                                  name="year"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label
                                  for="synopsis"
                                  class="form-label"
                                  id="synopsis"
                                  >Synopsis</label
                                >
                                <textarea
                                  class="form-control"
                                  aria-label="With textarea"
                                  id="synopsis"
                                  name="synopsis"
                                ></textarea>
                              </div>
                              <div class="text-start my-4">
                                <label for="genre" class="form-label" id="genre"
                                  >Genre</label
                                >
                                <input id="genre-in" type="text" style="display:none"/>
                                <select
                                  class="form-select"
                                  id="genre-sel"
                                  name="genre"
                                >
                                  <option selected>Genre...</option>
                                  <option value="Classic">Classic</option>
                                  <option value="Graphic novel">Graphic novel</option>
                                  <option value="Mystery">Mystery</option>
                                  <option value="Fantasy">Fantasy</option>
                                  <option value="Horror">Horror</option>
                                  <option value="Romance">Romance</option>
                                  <option value="Sci-Fi">Sci-Fi</option>
                                  <option value="Biography">Biography</option>
                                  <option value="Textbook">Textbook</option>
                                  <option value="Poetry">Poetry</option>
                                  <option value="Self-help">Self-help</option>
                                </select>
                                <script>
                                  const selectElement =
                                    document.getElementById("genre-sel");
                                  const inputElement =
                                    document.getElementById("genre-in");

                                  selectElement.addEventListener(
                                    "change",
                                    function () {
                                      inputElement.value = selectElement.value;
                                    }
                                  );
                                </script>
                              </div>
                              <div class="text-start my-4">
                                <div class="form-check form-switch">
                                  <label class="form-check-label" for="nyt"
                                    >New York Times Bestseller</label
                                  >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="nyt"
                                  />
                                  <script>
                                    const switchElement = document.getElementById('nyt');
                                    switchElement.addEventListener('change', function() {
                                        const switchState = switchElement.checked;
                                        console.log('Switch state:', switchState);
                                    });

                                  </script>
                                </div>
                              </div>
                              <button
                                class="btn btn-danger my-2 py-3 px-4"
                                onclick="BookService.list()"
                            >
                                Cancel
                            </button>
                              <button
                                class="btn my-2 py-3 px-4"
                                style="background-color: #5ee6b9"
                                onclick="BookService.add()"
                              >
                                Add book
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
    $("#add-book").html(html);


  },

  add: function () {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $("#add-book-form").validate({
      submitHandler: function (form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        const switchElement = document.getElementById("nyt");
        var switchState = switchElement.checked;
        if (switchState === true) {
          data.NYT_bestseller = 1;
        }
        data.created_by = payload.iduser;
        $.ajax({
          url: 'src/book',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
          },
          success: function (data) {
            // console.log(data);
            BookService.list();
            console.log(data);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        })
      }
    })
  },

  getBookById: function (idbook) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: 'src/book/' + idbook,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#book");
        var NYT;
        if (data.NYT_bestseller == 1) {
          NYT = 'New York Times Bestseller';
        } else if (data.NYT_bestseller == 0) {
          NYT = "";
        }
        if(data.img === null){
          data.img = 'qm.png';
        }
        var html = `
        <div class="card rounded-3 text-black">
          <div class="row p-4">
            <div class="col">
              <button
                class="btn btn-info-outlined"
                onclick="BookService.list()"
              >
                Back
              </button>
            </div>
            <div class="col offset-5">
              <button
                class="btn"
                style="background-color: #5ee6b9"
                onclick="BookService.showEdit(`+ data.idbook + `)"
              >
                Update
              </button>
              <button
                class="btn my-3"
                style="background-color: #5ee6b9"
                onclick="BookshelfService.showEdit(`+ data.idbook + `)"
              >
                Add to shelf
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-3 m-4">
              <img
                class="img-fluid"
                src="frontend/assets/`+ data.img + `"
              />
            </div>
            <div class="col-5 m-4">
              <h1>`+ data.title + `</h1>
              <h3>`+ data.author + `</h3>
              <p>`+ data.synopsis + `</p>
            </div>
            <div class="col-2 m-4 my-5">
              <p id="nyt">`+ NYT + `</p>
              <p>`+ data.genre + `</p>
            </div>
          </div>
        </div>
        `;

        $("#book").html(html);
        $("#book").data("book", data);
      }
    })
  },

  showEdit: function (idbook) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $.ajax({
      url: 'src/book/' + idbook,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
      },
      success: function (data) {
        SPApp.handleSectionVisibility("#edit-book");
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
                            <h4 class="mt-1 mb-5 pb-1">Edit book</h4>
                          </div>
                          <div class="text-center row">
                            <form id="edit-book-form">
                              <div class="text-start my-4">
                                <label for="title" class="form-label" id="title"
                                  >Title</label
                                >
                                <input
                                  type="text"
                                  class="form-control required"
                                  id="title"
                                  name="title"
                                  value="`+ data.title + `"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label for="author" class="form-label" id="author"
                                  >Author</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="author"
                                  name="author"
                                  value="`+ data.author + `"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label for="year" class="form-label" id="year"
                                  >Year</label
                                >
                                <input
                                  type="number"
                                  class="form-control"
                                  id="year"
                                  name="year"
                                  value="`+ data.year + `"
                                />
                              </div>
                              <div class="text-start my-4">
                                <label
                                  for="synopsis"
                                  class="form-label"
                                  id="synopsis"
                                  >Synopsis</label
                                >
                                <input
                                  class="form-control"
                                  aria-label="With textarea"
                                  id="synopsis"
                                  name="synopsis"
                                  value="`+ data.synopsis + `"
                                ></input>
                              </div>
                              <div class="text-start my-4">
                                <label for="genre" class="form-label" id="genre"
                                  >Genre</label
                                >
                                <input id="genre-in" type="text" style="display:none"/>
                                <select
                                  class="form-select"
                                  id="genre-sel"
                                  name="genre"
                                >
                                  <option selected>`+ data.genre + `</option>
                                  <option value="Classic">Classic</option>
                                  <option value="Graphic novel">Graphic novel</option>
                                  <option value="Mystery">Mystery</option>
                                  <option value="Fantasy">Fantasy</option>
                                  <option value="Horror">Horror</option>
                                  <option value="Romance">Romance</option>
                                  <option value="Sci-Fi">Sci-Fi</option>
                                  <option value="Biography">Biography</option>
                                  <option value="Textbook">Textbook</option>
                                  <option value="Poetry">Poetry</option>
                                  <option value="Self-help">Self-help</option>
                                </select>
                                <script>
                                  const selectElement =
                                    document.getElementById("genre-sel");
                                  const inputElement =
                                    document.getElementById("genre-in");

                                  selectElement.addEventListener(
                                    "change",
                                    function () {
                                      inputElement.value = selectElement.value;
                                    }
                                  );
                                </script>
                              </div>
                              <div class="text-start my-4">
                                <div class="form-check form-switch">
                                  <label class="form-check-label" for="nyt"
                                    >New York Times Bestseller</label
                                  >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="nyt"
                                  />
                                  <script>
                                    const switchElement = document.getElementById('nyt');
                                    switchElement.addEventListener('change', function() {
                                        const switchState = switchElement.checked;

                                    });

                                  </script>
                                </div>
                              </div>

                              <button
                                class="btn btn-danger my-2 py-3 px-4"
                                onclick="BookService.list()"
                            >
                                Cancel
                            </button>
                              <button
                                class="btn my-2 py-3 px-4"
                                style="background-color: #5ee6b9"
                                onclick="BookService.update(`+ data.idbook + `)"
                              >
                                Update book
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
        $("#edit-book").html(html);
        $("#edit-book").data("book", data);
      }
    })
  },

  update: function (idbook) {
    var payload = UserService.parseJWT(localStorage.getItem("token"));
    $("#edit-book-form").validate({
      submitHandler: function (form) {
        var data = Object.fromEntries((new FormData(form)).entries());
        const switchElement = document.getElementById("nyt");
        var switchState = switchElement.checked;
        data.NYT_bestseller = 0;
        if (switchState === true) {
          data.NYT_bestseller = 1;
        }
        data.created_by = payload.iduser;
        // var rb = document.querySelector('input[name="progress"]:checked').value;
        if ($("#read").is(":checked")) {
          data.progress = "read";
        } else if ($("#unread").is(":checked")) {
          data.progress = "unread";
        } else if ($("#reading").is(":checked")) {
          data.progress = "reading";
        }

        $.ajax({
          url: 'src/book/' + idbook,
          type: 'PUT',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
          },
          success: function (data) {
            // console.log(data);
            BookService.list();
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
