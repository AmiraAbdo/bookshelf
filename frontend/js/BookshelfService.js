var BookshelfService = {
    init: function () {
        BookshelfService.list();
    },

    list: function () {
        $.get("bookshelf", function (data) {
            SPApp.handleSectionVisibility("#bookshelf-list");
            var html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
                <!--krene kartica-->
                    <div class="col">
                        <div class="card shadow-sm" style="height:100%">
                            <img src="../bookshelf/frontend/assets/bookshelf.jpg" ></img>
                            <div class="card-body">
                                <h3>` + data[i].name + `</h3>
                                <p class="card-text">
                                    `+ data[i].description +`
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
            $("#bookshelf-list").html(html);
            $("#bookshelf-list").data("book", data);
        });
    },
}
