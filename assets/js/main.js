$(document).ready(function() {
// Classe para chamar o Json.
var parc = 3;

function json(){
	var qtd;
	var prod;

	// Resgatar valores.
	json.prototype.resgatarValores = function(){
		$('.cont').html('Carregando dados...');

		// Estrutura de resultado.
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
					//if(conta < 10) {
					
				this.prod += '<li> ';
				this.prod += '<div class="img" style="background-image:url(dyn_images/' + prodId + '_' + prodSku + '.jpg) "></div>'
				this.prod += ' <h4>' + prodTitle +'</h4> <hr>';
				this.prod += '<p class="price"><small>' + prodCForm + ' </small>' + prodPriceView + ' <br><spam class="parc">ou ' + parc +' X ' + prodCForm +' '+ prodPriceParceView +' </spam></p> '
				this.prod += '<a class="btn-add" data-id="' + prodId + '" data-sku="' + prodSku + '" data-title="' + prodTitle +'" data-price="' + prodPrice + '" data-desc="' + prodDescription + '" data-asize="' + prodAvailableSizes + '" data-cform="'+ prodCForm +'" ><i class="fa fa-plus"></i> Adicionar ao Carrinho</a></li>';

					//}
			}
						product = this.prod;

			$('.product-thumb').html(product);

		});
	}
}

	// Objeto.
	var obj = new json();
	obj.resgatarValores();

// Carrinho



        $(document).on('click', '.btn-add', function(event) {
            event.preventDefault(); 
            var cartId = $(this).data('id');
            var cartSku = $(this).data('sku');
            var cartId = $(this).data('id');
            var cartTitle = $(this).data('title');
            var cartDesc = $(this).data('desc');
            var cartASize = $(this).data('asize');
           // var cartPrice = $(this).data('price');
            var cardPrice = Number($(this).data('price')).toFixed(2);
                cardPriceView =  cardPrice.replace('.', ',');
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
           // $('aside#cart ul.list').append('<li class="item" data-sku="' + cartSku +'"> ID= '+ cartSku + '<br> ' + prodQuant +'</li>');
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
            	//console.log('remover ' + removeItem);
            	var removeStt = $('#cart ul.list li.item[data-sku="' + removeItem + '"].active').data('stt');
            	$('#cart ul.list li.item[data-sku="' + removeItem + '"]').remove();
            	//console.log('$('+removeItem+').remove();');
            });
            var chkCart = $('#cart ul.list li.item').length;
				$('aside#cart h2 > span span.quant').html(chkCart);
				if(chkCart != 0) {
				// criar uma array com os valores
				var subTTL = $('#cart ul.list li.item.active').map(function () {
				    return parseFloat($(this).data('stt'));
				}).get();
				// somar todos
				var subTotal = subTTL.reduce(function (sttA, sttB) {
				    return sttA + sttB;
				});
				var removeStt;
				if(removeStt == 'undefined' || removeStt == null) {
					removeStt = 0;
				}
				console.log('nois ' + removeStt);
				removeStt = parseFloat(removeStt);
				subTotal = parseFloat(subTotal);
				subTotal = subTotal - removeStt;
				var parcTotal = subTotal / parc;
				subTotal = Number(subTotal).toFixed(2);
                subTotal =  subTotal.replace('.', ',');
				parcTotal = Number(parcTotal).toFixed(2);
                parcTotal =  parcTotal.replace('.', ',');
				// exibir resultado

				
				}
				//var curForm = $(this).data('cform');
				var showTotal = '<li class="title"> <span>Subtotal</span></li><li class="sub-total"><span>' + cartCForm + ' ' + subTotal + '</span><small>ou  até em '+ parc +' X  ' + cartCForm + ' ' + parcTotal + '</small></li>';
				$('ul.total').html(showTotal);

			 var showTotal = $('aside#cart h2 > span span.quant').text();
			
	
		});

        var chkCart = $('#cart ul.list li.item').length;
			$('aside#cart h2 > span span.quant').html(chkCart);
			if(chkCart == 0){
				$('aside#cart ul.list').html('<li class="msg"><div class="cont-item"<p>Nenhum produto selecionado!</p></div></li>');
			} 


		
});