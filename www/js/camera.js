$("document").ready(function() {
        function onCamSuccess(imageURI) {
            document.getElementById("camImg").src = imageURI;
            document.getElementById("status").innerHTML = "Ảnh đã chọn";
            navigator.notification.beep(1);
            navigator.notification.vibrate(2000);
            $("#camImg").css("display","block").show(1000);
            $("#form").css("display","block");
            $("#submit").on("click",function (e) {
            e.preventDefault();
            n = $("#name").val();
            mt = $("#mota").val();
            if (n=='' || mt=='') {
                navigator.notification.alert('Vui lòng nhập tiêu đề và mô tả vào!');}
            else {
                function insertDB(tx) {
                    tx.executeSql("INSERT INTO DEMO (name, image, detail) VALUES ('"+n+"', '"+imageURI+"', '"+mt+"')");
                }
                var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
                db.transaction(insertDB, function(err) {navigator.notification.alert('Lỗi:!'+err.code)}, function() {navigator.notification.alert('Thành công!')});
                
            }
            });
        }
        function onCamError(message) {
                document.getElementById("status").innerHTML = "Camera error: " + message;
            }
        $("#newPicLink").on("click", function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { quality: 100, correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
        $("#existingPicLink").on("click", function (e) {
                navigator.camera.getPicture(onCamSuccess, onCamError, { sourceType: Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.FILE_URI, quality: 50, targetWidth: 200, targetHeight: 200 });
                e.preventDefault();
            });
})