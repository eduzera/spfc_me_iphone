Ti.UI.setBackgroundColor('#eaeaea');


var home = function(){
	
	var that 		= this;
	this.url		= "http://localhost:3000"//"http://spfc.me";
	
	this.win_title;
	this.win;		

	this.table;
	this.tableData 	= [];
	this.json_call;
	
	this.win_ngames;
	this.mainTabGroup;
	this.tab_ngames;
	this.tab_lnews;
	
	this.startup = function(){
		
		this.createTemplate();
		
		this.getNotices();

	},
	
	this.createTemplate = function(){
		
		//1. Cria titulo da window
		this.win_title	= Titanium.UI.createView({backgroundColor:'black', width: Titanium.Platform.displayCaps.platformWidth ,height:"45px",top:0});
		//2. Cria window
		this.win		= Ti.UI.createWindow({ fullscreen: true, navBarHidden:true});
		//3. Cria table
		this.table		= Ti.UI.createTableView({top: "45px"});
		
		//4. Cria Window de ultimos jogos
		this.win_ngames		 = Ti.UI.createWindow({ title: "Próximos Jogos", barColor: "#C7172C"  });
		//5. Container de Tabs
		this.mainTabGroup 	 = Ti.UI.createTabGroup();
		//6. Criando as tabs
		this.tab_ngames 	 = Ti.UI.createTab({title: "Próximos Jogos", window: this.win_ngames, icon: "ball.png" });
		this.tab_lnews	 	 = Ti.UI.createTab({title: "Últimas Notícias", window: this.win, icon: "news.png" });
		
		//Adicionando componentes a tela
		
		//1. Add titulo a window
		this.win.add(this.win_title);
		//2. add table a windoe
		this.win.add(this.table);
		
		//3.Add windows a grupo de tabs
		this.mainTabGroup.addTab(this.tab_lnews);
		this.mainTabGroup.addTab(this.tab_ngames);
		
		//4. Add image a titulo
		this.win_title.add( Titanium.UI.createImageView({image: "logo.png", top: "3px", left: "6px", height: "35px"}) );
		
		//5. Abre o grupo de tabs
		this.mainTabGroup.open();

		//6. Define a orientação da tela
		this.win.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
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
	this.date		 = json.date_formated;
	this.source		 = json.source_name;
	this.row;

	
	this.startup = function(){
			this.setRow();
	},
	
	this.setRow = function(){
		
		image 	  = Titanium.UI.createImageView({
					image:this.image,
					width:"100px",
					height:"100px",
					top: "6px",
					left: "6px",
					bottom: "6px"
					});

		dateLabel = Ti.UI.createLabel({
			text: this.date,
			font:{
		         	fontSize:'10px',
		            fontWeight:'bold'
		          },
		    color: "#6D6E71",
		    height: "auto",
		    top: "0px"
		});
		
		sourceLabel = Ti.UI.createLabel({
			text: "Fonte: " + this.source,
			font:{
		         	fontSize:'10px',
		            fontWeight:'bold'
		          },
		    color: "#6D6E71",
		    height: "auto",
		    top: "6px"
		});
		
		nameLabel = Ti.UI.createLabel({
		            text:this.title,
		            font:{
		                fontSize:'12px',
		            	fontWeight:'bold'
		        	},
		        	height:'auto',
		        	right: "6px",
			        top:'3px',
			        color:'#C7172C',
			        touchEnabled:true
			        // top: "3px"
	   });

	   nickLabel = Ti.UI.createLabel({
		        	text:'"' + this.description + '"',
			        font:{
			            fontSize:'12px'
			        },
			        height:'auto',
			        right: "6px",
			        bottom:'15px',
			        color:'#6D6E71',
			        touchEnabled:true,
			        top: "12px"
			  	});
			  	
	  this.row = Ti.UI.createTableViewRow({ height: "auto" });
	  this.row.add(image);
	  
	  var view = Ti.UI.createView({left: 122, layout: "vertical", height: "auto"});
	  view.add(dateLabel);
	  view.add(nameLabel);
      // view.add(nickLabel);
      view.add(sourceLabel);
      this.row.add(view);
      
      Home.tableData.push(this.row);
		
	}
	
	this.startup();
	
}

var Home = new home();

