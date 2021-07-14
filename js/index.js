$(function() {
    // 获取图书列表
    function getBookList() {
        const getbookUrl = "http://www.liulongbin.top:3006/api/getbooks";
        $.get(getbookUrl, function(res) {
            console.log(res);
            if (res.status !== 200) return alert("获取数据失败！");
            var rows = [];
            $.each(res.data, function(i, item) {
                var str = `<tr><td>${item.id}</td>
                <td>${item.bookname}</td>
                <td>${item.author}</td>
                <td>${item.publisher}</td>
                <td> <a href="javascript:;" class="del" data-id="${item.id}">删除</a></td></tr>`;
                rows.push(str);
            });
            $("#tb").empty().append(rows.join(''));
        });
        // 添加删除功能 用代理的方式拿到id
        $("#tb").on('click', '.del', function() {
            let id = $(this).attr('data-id');
            delBook(id);
        });
    }

    function delBook(bookId) {
        const url = "http://www.liulongbin.top:3006/api/delbook";
        var parm = { id: bookId };
        $.get(url, parm, function(res) {
            if (res.status !== 200) return alert("删除失败");
            console.log(res);
            getBookList();

        });
    }
    getBookList();

    // 添加图书
    $("#addbtn").on('click', function() {
        var bookname = $("#iptBookname").val().trim();
        var author = $("#iptAuthor").val().trim();
        var publisher = $("#iptPublisher").val().trim();
        if (bookname === '' || author === '' || publisher === '') {
            alert("请输入完整内容");
            return;
        }
        addbook(bookname, author, publisher);
    });

    function addbook(bookname, author, publisher) {
        const addbookUrl = "http://www.liulongbin.top:3006/api/addbook";
        var parm = {
            author: author,
            bookname: bookname,
            publisher: publisher
        };
        $.post(addbookUrl, parm, function(res) {
            console.log(res);
            if (res.status !== 201) return alert("添加图书失败！");
            getBookList();
            clearInputs();
        });
    }

    function clearInputs() {
        $("#iptBookname").val('');
        $("#iptAuthor").val('');
        $("#iptPublisher").val('');
    }
})