var crmAPI = (function () {
    var getData = function (callType, path, sendData, onsuccess, onerror, before) {
        //var baseURL = "http://crmapitest.kociletisim.com.tr/api/Basvuru/";
        var baseURL = "http://localhost:50752/api/Basvuru/";
        $.ajax({
            method: callType,
            url: baseURL + path,
            data: JSON.stringify(sendData),
            contentType: "application/json",
            async: true,
        }).success(function (data, status, xhr) {
            if (onsuccess) onsuccess(data);
        }).fail(function (xhr, status, error) {
            if (onerror) onerror(error);
        });
    }
    return {
        insertBasvuru: function (data, onsuccess, onerror, before) {
            getData("POST", "insertBasvuru", data, onsuccess, onerror, before);
        },
    }
})();