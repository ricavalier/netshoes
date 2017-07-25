$(document).ready(function() {

$('nav button').click(function(){
	$('#cart').toggleClass('active');
});

var parc = 3;

function json(){
	var qtd;
	var prod;

	json.prototype.resgatarValores = function(){
		$('.cont').html('Carregando dados...');

		$.getJSON('./assets/public/data/products.json', function(data){
			this.qtd = data.products.length;
			this.prod = '';
			if(parc < 2) {
				$('span.parce').hide();
			}
			for (i = 0; i < this.qtd; i++){
				var count = i;
			    var prodId = data.products[i].id;
			    var prodSku = data.products[i].sku;
			    var prodTitle = data.products[i].title;
			    var prodDescription = data.products[i].description;
      			var prodAvailableSizes = data.products[i].availableSizes;
      			var prodStyle = data.products[i].style;
      			var prodPrice = Number(data.products[i].price).toFixed(2);
      				prodPriceView = '<span class="val">' + prodPrice.replace('.', '</span>,<small>') + '</small>';
      			var prodInstallments = data.products[i].installments;
      			var prodCId = data.products[i].currencyId;
      			var prodCForm = data.products[i].currencyFormat;
      			var prodShipping = data.products[i].isFreeShipping;
      			var prodPriceParce = Number(data.products[i].price/parc).toFixed(2);
      				prodPriceParceView = prodPriceParce.replace('.', ',');			     

				var conta = i + 1;
					
				this.prod += '<li> ';
				this.prod += '<div class="img" style="background-image:url(dyn_images/' + prodId + '_' + prodSku + '.jpg) "></div>'
				this.prod += ' <h4>' + prodTitle +'</h4> <hr>';
				this.prod += '<p class="price"><small>' + prodCForm + ' </small>' + prodPriceView + ' <br><spam class="parc">ou ' + parc +' X ' + prodCForm +' '+ prodPriceParceView +' </spam></p> '
				this.prod += '<a class="btn-add" data-id="' + prodId + '" data-sku="' + prodSku + '" data-title="' + prodTitle +'" data-price="' + prodPrice + '" data-desc="' + prodDescription + '" data-asize="' + prodAvailableSizes + '" data-cform="'+ prodCForm +'" ><i class="fa fa-plus"></i> Adicionar ao Carrinho</a></li>';

			}
			product = this.prod;

			$('.product-thumb').html(product);
		});
	}
}
var obj = new json();
	obj.resgatarValores();

        $(document).on('click', '.btn-add', function(event) {
            event.preventDefault(); 
            var cartId = $(this).data('id');
            var cartSku = $(this).data('sku');
            var cartId = $(this).data('id');
            var cartTitle = $(this).data('title');
            var cartDesc = $(this).data('desc');
            var cartASize = $(this).data('asize');
            var cardPrice = Number($(this).data('price')).toFixed(2);
                cardPriceView = '<strong>' + cardPrice.replace('.', '</strong>,');
            var cartCForm = $(this).data('cform');
            var prodQuant;
            var	prodCount = $('#cart ul.list li.item[data-sku="' + cartSku + '"]').length;
            	prodQuant = prodCount + 1;

           	var sttQuant = parseInt(prodQuant);
           	var sttValor = cardPrice;
   			var sttTTL = sttQuant * sttValor;
      			
            var itemProd = '<li id="prod'+cartId+'" class="item prod'+cartId+'" data-sku="' + cartSku +'" data-stt="' + sttTTL +'" data-cform="' + cartCForm +'" ><div class="cont-item">'; //  ID= '+ cartSku + '<br> ' + prodQuant;
                itemProd += '<div class="cart-thumb" style="background-image:url(dyn_images/' + cartId + '_' + cartSku + '.jpg);"></div>';
                itemProd += '<div class="cart-prod"> <h4><span class="cart-remove" data-remove="' + cartSku +'"><i class="fa fa-times"></i></span>' + cartTitle +' </h4>';
                itemProd += '<p class="cart-desc">' + cartDesc + ' ' + cartASize +' <br>Quantidade: <span class="qnt">'+ prodQuant + '</span></p><p class="cart-price"> ' + cartCForm + ' <span>' + cardPriceView + '</span> </p></div></div></li>';

            $('aside#cart ul.list li.msg').remove();
            $('aside#cart ul.list').append(itemProd);
            chkCart = $('#cart ul.list li.item').length;
            $('aside#cart h2 > span span.quant').html(chkCart);

            if(prodQuant > -1) {
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]').hide();
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]').removeClass("active");
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]').addClass("remove");
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]:last-child').show();
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]:last-child').addClass("active");
            	$('#cart ul.list li.item[data-sku="' + cartSku + '"]:last-child').removeClass("remove");
            }
            $('.cart-remove').click(function() {
            	var removeItem = $(this).data('remove');
            	var removeStt = $('#cart ul.list li.item[data-sku="' + removeItem + '"].active').data('stt');
            	setTimeout(function(){ $('#cart ul.list li.item[data-sku="' + removeItem + '"]').remove();}, 1500);
            	$('#cart ul.list li.item[data-sku="' + removeItem + '"]').addClass('del');
            });
            var chkCart = $('#cart ul.list li.item').length;
			$('aside#cart h2 > span span.quant').html(chkCart);
			if(chkCart != 0) {
				var subTTL = $('#cart ul.list li.item.active').map(function () {
			    return parseFloat($(this).data('stt'));
			}).get();
			var subTotal = subTTL.reduce(function (sttA, sttB) {
			return sttA + sttB;
		});
		var removeStt;
		if(removeStt == 'undefined' || removeStt == null) {
			removeStt = 0;
		}
		removeStt = parseFloat(removeStt);
		subTotal = parseFloat(subTotal);
		subTotal = subTotal - removeStt;
		var parcTotal = subTotal / parc;
		subTotal = Number(subTotal).toFixed(2);
        subTotal =  '<strong>' + subTotal.replace('.', '</strong>,');
		parcTotal = Number(parcTotal).toFixed(2);
        parcTotal =  parcTotal.replace('.', ',');

		$('.cart-remove').click(function(e){
			e.preventDefault();
			removeStt = parseFloat(removeStt);
			subTotal = parseFloat(subTotal);
			subTotal = subTotal - removeStt;
			var parcTotal = subTotal / parc;
			subTotal = Number(subTotal).toFixed(2);
	        subTotal =  subTotal.replace('.', ',');
			parcTotal = Number(parcTotal).toFixed(2);
	        parcTotal =  parcTotal.replace('.', ',');
		});

        
	}


	var showTotal = '<li class="title"> <span>Subtotal</span></li><li class="sub-total"><span>' + cartCForm + ' ' + subTotal + '</span><small>ou  até em '+ parc +' X  ' + cartCForm + ' ' + parcTotal + '</small></li>';
	var chkCart = $('#cart ul.list li.item').length;




		
		if(chkCart == ''){
			showTotal = '<li class="msg"><div class="cont-item"<p>Nenhum produto selecionado!</p></div></li>';
		}

	$('ul.total').html(showTotal);
	$('aside#cart h2 > span span.quant, nav button span').html(chkCart);

	$('.cart-remove').click(function(){ 
		$('ul.total').html();
		$('aside#cart h2 > span span.quant, nav button span').html();
	});
	
		});




		
});