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
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
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
                let html = '';
                for (let i = 0; i < data.length; i++) {
                    html += `
                <div class="col">
                    <div class="card shadow-sm" style="height:100%">
                        <img src="../bookshelf/frontend/assets/tfios.jpg" ></img>
                        <div class="card-body">
                            <h3>` + data[i].title + ' - ' + data[i].author + `</h3>
                            <p class="card-text">
                                ` + data[i].synopsis + `
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-top:auto">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
                                        View
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
                                        Edit
                                    </button>
                                </div>
                                <small class="text-body-secondary">9 mins</small>
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
    }
}
