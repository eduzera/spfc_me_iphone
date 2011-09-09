Ti.UI.setBackgroundColor('#eaeaea');

var home = function(){
	
	var that 		= this;
	this.url		= "http://spfc.me";
	this.win		= Ti.UI.createWindow();
	this.table		= Ti.UI.createTableView();
	this.tableData 	= [];
	this.json_call;
	
	this.startup = function(){
		
		this.getNotices();

		this.win.add(this.table);
		this.win.open();
	},
	
	this.getNotices = function(){
		
		this.json_call = Ti.Network.createHTTPClient({
	
			onload: function(){
		
	  		  json = JSON.parse(this.responseText);
	  
			  for (var i=0; i < json.length; i++) {
				
				notice = json[i];
				
				new Noticia(notice);
				
	  		  };
	  
	  		  that.table.setData(that.tableData);
			}
	
		});
		
		this.json_call.open("GET", this.url +"/noticias.json");
		this.json_call.send();
	}
	
	this.startup();
	
}

var Noticia = function(json){
	
	var that		 = this;
	this.title		 = json.title;
	this.description = json.description;
	this.image		 = Home.url + json.iphone_cover_image;
	this.row		 = Ti.UI.createTableViewRow({ height:'120px' });

	
	this.startup = function(){
			this.setRow();
	},
	
	this.setRow = function(){
		
		image 	  = Titanium.UI.createImageView({
					image:this.image,
					width:"100px",
					height:"100px",
					top: "6px",
					left: "6px"});

		nameLabel = Ti.UI.createLabel({
		            text:this.title,
		            font:{
		                fontSize:'12px',
		            fontWeight:'bold'
		        	},
		        	height:'auto',
		        	width: "200px",
			        left:'112px',
			        top:'3px',
			        color:'#C7172C',
			        touchEnabled:true
	   });
	   
	   nickLabel = Ti.UI.createLabel({
		        	text:'"' + this.description + '"',
			        font:{
			            fontSize:'12px'
			        },
			        height:'auto',
			        width: "200px",
			        left:'112px',
			        top: '65px',
			        bottom:'15px',
			        color:'#6D6E71',
			        touchEnabled:true
			  	});
			  	
	  this.row.add(nameLabel);
      this.row.add(nickLabel);
      this.row.add(image);
      Home.tableData.push(this.row);
		
	}
	
	this.startup();
	
}

var Home = new home();

