let books = [];

$(document).ready(function () {

    $.ajax({
        url: "books.xml",
        type: "GET",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    date: $(this).find("date").text()
                };

                books.push(book);
            });

            displayBooks(books);
        }
    });

    $("#filterBtn").click(function () {

    let genre = $("#genreFilter").val();

    let author = $("#authorFilter").val() || "";
    author = author.toLowerCase();

    let maxPrice = $("#priceFilter").val();
    if (maxPrice === "") {
        maxPrice = null;
    }

    let filtered = books.filter(function (book) {

        let genreMatch = (genre === "all" || book.genre === genre);

        let authorMatch = (
            author === "" ||
            book.author.toLowerCase().includes(author)
        );

        let priceMatch = (
            maxPrice === null ||
            book.price <= parseFloat(maxPrice)
        );

        return genreMatch && authorMatch && priceMatch;
    });

    displayBooks(filtered);
});

});

function displayBooks(bookArray) {

    let tableBody = $("#bookTable tbody");
    tableBody.empty();

    $.each(bookArray, function (index, book) {

        let row = "<tr>" +
            "<td>" + book.title + "</td>" +
            "<td>" + book.author + "</td>" +
            "<td>" + book.genre + "</td>" +
            "<td>" + book.price + "</td>" +
            "<td>" + book.date + "</td>" +
            "</tr>";

        tableBody.append(row);
    });
}