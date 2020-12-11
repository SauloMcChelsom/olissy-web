DROP VIEW public.get_order_client_view cascade;

DROP FUNCTION public.get_order_client_fn(integer) cascade;
DROP FUNCTION public.create_new_account_fn(text, text, text, text, text) CASCADE;
DROP FUNCTION public.email_informed_exists_fn(text) CASCADE;
DROP FUNCTION public.get_user_client_store_fn(text) cascade;
DROP FUNCTION public.query_product() cascade;

DROP TYPE type_order_client cascade;
DROP TYPE type_create_new_account cascade; 
DROP TYPE type_query_product cascade; 

DROP TABLE public.increment cascade;
DROP TABLE public.company cascade;
DROP TABLE public.warehouse cascade;
DROP TABLE public.user cascade;
DROP TABLE public.client cascade;
DROP TABLE public.store cascade;
DROP TABLE public.product cascade;
DROP TABLE public.comment cascade;
DROP TABLE public.order cascade;
DROP TABLE public.order_note cascade;
DROP TABLE public.order_product cascade;
DROP TABLE public.order_taxa_delivery_select_by_client cascade;
DROP TABLE public.invoice cascade;

create table  "app"."public"."increment" (
	"store"     integer not null, 
	"warehouse" integer not null, 
	"client"    integer not null, 
	"user"      integer not null
);

create table "app"."public"."company" (
	"primary_key"  serial    primary key, 
	"timestamp"    timestamp not null, 
	"name"         text      not null, 
	"name_search"  text      not null
);

create table "app"."public"."warehouse" (
	"primary_key" 		     serial    primary key, 
	"timestamp"  		     timestamp not null, 
	"company"   		     integer   not null, 
	"image_url"	             text      not null, 
	"image_path"		     text      not null, 
	"price" 		         numeric   not null, 
	"name"			         text      not null, 
	"name_for_search" 	     text      not null, 
	"description"            text      not null, 
	"description_for_search" text      not null, 
	"session" 		         text      not null, 
	"category"               text      not null, 
	"type"			         text      not null, 
	"and_generic" 		     boolean   not null, 
	foreign key ("company") references "app"."public"."company" ("primary_key")
);

create table "app"."public"."user"(
	"primary_key"     serial    primary key, 
	"foreign_key_uid" text      not null, 
	"timestamp"       timestamp not null, 
	"password"        text      not null,  
	"terms"           boolean   not null, 
	"type"            smallint  not null, 
	"email"           text      not null,
	"provider"        text      not null,
	unique ("foreign_key_uid"),
	unique ("email")
);

create table "app"."public"."client" (
	"primary_key"      serial    primary key, 
	"foreign_key_user" integer   not null, 
	"timestamp"        timestamp not null, 
	"name"             text      not null, 
	"last_name"        text          null, 
	"image_icon_path"  text          null, 
	"image_icon_url"   text          null, 
	"sex"              text          null, 
	"birth"            date          null, 
	"cellphone"        text          null, 
	"telephone"        text          null, 
	"country"          text          null, 
	"state_federal"    text          null, 
	"city"             text          null, 
	"neighborhood"     text          null, 
	"street"           text          null, 
	"cep"              text          null, 
	foreign key ("foreign_key_user") references "app"."public"."user" ("primary_key"),
	unique ("foreign_key_user")
);

create table "app"."public"."store" (
	"primary_key"               serial    primary key, 
	"foreign_key_user"          integer   not null, 
	"timestamp"                 timestamp not null, 
	"name"                      text      not null, 
	"image_icon_path"           text      not null, 
	"image_icon_url"            text      not null, 
	"image_back_ground_path"    text      not null, 
	"image_back_ground_url"     text      not null, 
	"country"                   text      not null, 
	"state_federal"             text      not null, 
	"city"                      text      not null, 
	"neighborhood"              text      not null, 
	"street"                    text      not null, 
	"cep"                       text      not null, 
	"hours_of_work"             text      not null, 
	"email"                     text      not null, 
	"cellphone"                text      not null, 
	"telephone"                text      not null, 
	"about"                     text      not null, 
	"cnpj"                      text      not null, 
	"quantity_of_product"       numeric   not null, 
	"follow"                    integer   not null, 
	"store_open_or_closed"      boolean   not null, 
	"total_of_sale"             numeric   not null, 
	"authorization_for_open_store" boolean   not null, 
	"credit"                    boolean   not null, 
	"debit"                     boolean   not null, 
	"money"                     boolean   not null, 
	"delivery_by"               text[]    not null, 
	"delivery_free_above"       text[]    not null, 
	"negotiaterate_delivery"    text[]    not null, 
	"only_in_neighborhood"      text[]    not null, 
	foreign key ("foreign_key_user") references "app"."public"."user" ("primary_key")
);

create table "app"."public"."product" (
	"primary_key"           serial    primary key, 
	"timestamp"             timestamp not null, 
	"foreign_key_user"      integer   not null, 
	"foreign_key_warehouse" integer   not null, 
	"foreign_key_store"     integer   not null, 
	"price"                 numeric   not null, 
	"product_for_sale"      boolean   not null, 
	"quantities"            integer   not null, 
	"total_of_love"         integer   not null, 
	"total_of_sale"         integer   not null, 
	"total_of_comment"      integer   not null, 
	foreign key ("foreign_key_user")     references "app"."public"."user"      ("primary_key"),	
	foreign key ("foreign_key_store")    references "app"."public"."store"     ("primary_key"),	
	foreign key ("foreign_key_warehouse")references "app"."public"."warehouse" ("primary_key")
);

create table "app"."public"."comment" (
	"primary_key"         serial    primary key, 
	"timestamp"           timestamp not null, 
	"foreign_key_user"    integer   not null, 
	"foreign_key_product" integer   not null, 
	"foreign_key_store"   integer   not null, 
	"text"                text      not null, 
	"image_icon_url"      text      not null, 
	"name"                text      not null, 
	"view"                boolean   not null, 
	foreign key ("foreign_key_store")   references "app"."public"."store"   ("primary_key"),
	foreign key ("foreign_key_product") references "app"."public"."product" ("primary_key"),
	foreign key ("foreign_key_user")    references "app"."public"."user"    ("primary_key")
);

create table "app"."public"."order" (
	"primary_key"                           serial    primary key, 
	"timestamp"                             timestamp not null, 
	"foreign_key_store"                     integer   not null, 
	"foreign_key_client"                    integer   not null, 
	"addressfullofclient"                   text      not null, 
	"name_of_client"                        text      not null, 
	"last_name_of_client"                   text      not null, 
	"image_icon_url_of_client"              text      not null, 
	"email_of_client"                       text      not null, 
	"cellphone_of_client"                   text      not null, 
	"city_of_client"                        text      not null, 
	"neighborhood_of_client"                text      not null, 
	"street_of_client"                      text      not null, 
	"order_state"                           text      not null, 
	"name_of_store"                         text      not null, 
	"image_icon_url_of_store"               text      not null, 
	"cellphone_of_store"                    text      not null, 
	"email_of_store"                        text      not null, 
	"city_of_store"                         text      not null, 
	"neighborhood_of_store"                 text      not null, 
	"street_of_store"                       text      not null, 
	"cnpj_of_store"                         text      not null, 
	"store_viewed_the_order"                boolean   not null, 
	"method_payment"                        text      not null, 
	"inform_change"                         text      not null, 
	"taxa_of_platform"                      numeric   not null, 
	"taxa_delivery_select_by_client_status" text      not null, 
	--"total_order_value"                  numeric   not null, 
	--"product"                          text[], 
	--"taxa_delivery_select_by_client"       text[], 
	--"note"                             text[], 
	foreign key ("foreign_key_store") references "app"."public"."store"  ("primary_key"),
	foreign key ("foreign_key_client")references "app"."public"."client" ("primary_key")
);


create table "app"."public"."order_taxa_delivery_select_by_client" (
	"primary_key"       serial    primary key, 
	"timestamp"         timestamp not null, 
	"foreign_key_order" integer   not null, 
	"description"       text      not null, 
	"value"             text      not null, 
	"taxa"              numeric   not null, 
	"km"                numeric   not null, 
	foreign key ("foreign_key_order") references "public"."order" ("primary_key")
);

create table "app"."public"."order_product" (
	"primary_key"         serial    primary key, 
	"timestamp"           timestamp not null, 
	"foreign_key_order"   integer   not null, 
	"foreign_key_product" integer   not null, 
	"name"             	  text      not null, 
	"price"               numeric   not null, 
	--"totalofprice"      numeric   not null, 
	"quantity"            integer   not null, 
	"stayed_in_store"       integer   not null, 
	foreign key ("foreign_key_order")  references "app"."public"."order"   ("primary_key"),
	foreign key ("foreign_key_product")references "app"."public"."product" ("primary_key")
);

create table "app"."public"."order_note" (
	"primary_key"       serial primary key, 
	"timestamp"         timestamp not null, 
	"foreign_key_order" integer not null, 
	"name"              text not null, 
	"text"              text not null, 
	"view"              boolean not null, 
	foreign key ("foreign_key_order") references "app"."public"."order" ("primary_key")
);

create table "app"."public"."invoice" (
	"primary_key"                           serial primary key, 
	"timestamp"                             timestamp not null, 
	"foreign_key_store"                     integer   not null, 
	"foreign_key_client"                    integer   not null, 
	"addressfullofclient"                   text      not null, 
	"name_of_client"                        text      not null, 
	"last_name_of_client"                   text      not null, 
	"image_icon_url_of_client"              text      not null, 
	"email_of_client"                       text      not null, 
	"cellphone_of_client"                   text      not null, 
	"city_of_client"                        text      not null, 
	"neighborhood_of_client"                text      not null, 
	"street_of_client"                      text      not null, 
	"order_state"                           text      not null, 
	"name_of_store"                         text      not null, 
	"image_icon_url_of_store"               text      not null, 
	"cellphone_of_store"                    text      not null, 
	"email_of_store"                        text      not null, 
	"city_of_store"                         text      not null, 
	"neighborhood_of_store"                 text      not null, 
	"street_of_store"                       text      not null, 
	"cnpj_of_store"                         text      not null, 
	"store_viewed_the_order"                boolean   not null, 
	"total_order_value"                     numeric   not null, 
	"method_payment"                        text      not null, 
	"inform_change"                         text      not null, 
	"taxa_of_platform"                      numeric   not null, 
	"product"                               json      not null, 
	"note"                                  json      not null, 
	"taxa_delivery_select_by_client"        json      not null, 
	"taxa_delivery_select_by_client_status" text not null, 
	foreign key ("foreign_key_store")  references "app"."public"."store"  ("primary_key"),
	foreign key ("foreign_key_client") references "app"."public"."client" ("primary_key")
);



insert into "increment" ("store","warehouse","client","user") values (0,0,0,0);

insert into "company" ("timestamp","name","name_search") values (current_timestamp,'NIVEA','nivea');
insert into "company" ("timestamp","name","name_search") values (current_timestamp,'NESTLÉ','nestle');

insert into "warehouse" ("timestamp","company","image_url","image_path","price","name","name_for_search","description","description_for_search","session","category","type","and_generic") values (current_timestamp,1,'https://firebasestorage.googleapis.com/v0/b/olissy-web-test.appspot.com/o/werehouse%2F2020828165511124.jpg?alt=media&token=1324348f-a3ae-4743-9669-47e513a9ed11','/assets/olissy/img/warehouse/6666t6rt6rrt6ytUIO54.png',24.2,'CREME FACIAL NIVEA ANTISSINAIS 100G','creme facial nivea antissinais 100g','<p>O <b>Creme Facial Antissinais Nivea</b> possui fórmula ultra leve com Tecnologia <b>Hydro-Waxes</b> à base de água e vitamina E, além de proporcionar hidratação intensa sem deixar sensação oleosa na pele. Firma e reduz linhas de expressão para uma pele bonita e com aspecto saudável.<br><br><b>Benefícios:</b><br><br>- Antissinais;<br>- Hidratação intensa;<br>- Firma e reduz linhas de expressão;<br>- Protege contra os raios UVA/UVB;<br>- Fórmula leve de rápida absorção;<br>- Sensação não oleosa.<br><br><b>Precauções:</b> Uso externo. Evite contato com os olhos. Caso aconteça, enxágue com água em abundância. Em caso de irritação, suspenda o uso e procure orientação médica. Manter em local seco e arejado, ao abrigo de luz e fora do alcance de crianças. Este produto não é um protetor solar.<br><br></p>','<p>o <b>creme facial antissinais nivea</b> possui formula ultra leve com tecnologia <b>hydro-waxes</b> a base de agua e vitamina e, alem de proporcionar hidratacao intensa sem deixar sensacao oleosa na pele. firma e reduz linhas de expressao para uma pele bonita e com aspecto saudavel.<br><br><b>beneficios:</b><br><br>- antissinais;<br>- hidratacao intensa;<br>- firma e reduz linhas de expressao;<br>- protege contra os raios uva/uvb;<br>- formula leve de rapida absorcao;<br>- sensacao nao oleosa.<br><br><b>precaucoes:</b> uso externo. evite contato com os olhos. caso aconteca, enxague com agua em abundancia. em caso de irritacao, suspenda o uso e procure orientacao medica. manter em local seco e arejado, ao abrigo de luz e fora do alcance de criancas. este produto nao e um protetor solar.<br><br></p>','beleza','Rosto','Loção/Óleo/Creme/Gel/Hidratantes/Spray','0');
insert into "warehouse" ("timestamp","company","image_url","image_path","price","name","name_for_search","description","description_for_search","session","category","type","and_generic") values (current_timestamp,1,'https://firebasestorage.googleapis.com/v0/b/olissy-web-test.appspot.com/o/werehouse%2F202083195946401.jpg?alt=media&token=bcc4b3b0-9cde-4355-9ef8-a054e57211f1','/assets/olissy/img/warehouse/6666t6rt6rrt6ytUIO54.png',3.8,'BALA DE GELATINA FINI BERRI OX VITAMINA E 18G','bala de gelatina fini berri ox vitamina e 18g','<p>Balas de gelatina para dietas de ingestão controlada de açúcares , sabores sortidos. Contém aromatizante<br></p>','<p>balas de gelatina para dietas de ingestao controlada de acucares , sabores sortidos. contem aromatizante<br></p>','saude','Alimentos','Balas','0');
insert into "warehouse" ("timestamp","company","image_url","image_path","price","name","name_for_search","description","description_for_search","session","category","type","and_generic") values (current_timestamp,2,'https://firebasestorage.googleapis.com/v0/b/olissy-web-test.appspot.com/o/werehouse%2F2020828165039324.jpg?alt=media&token=eb70706a-e5ec-49e0-83c5-885aad6c1d4c','/assets/olissy/img/warehouse/6666t6rt6rrt6ytUIO54.png',18,'LEITE NESTLÉ EM PÓ','leite nestle em po','<p><b></b><u></u>Ninho <u></u>Zero<b></b> Lactose Forti+ é fortificado com Ferro, Zinco e Vitaminas A, C e D, essenciais para a nutrição das crianças.<br><br><b>Ingredientes:</b> Leite integral, maltodextrina, soro de leite, enzima lactase, vitaminas (A, D e C), minerais (ferro e zinco) e emulsificante lecitina de soja. NÃO CONTÉM GLÚTEN.<br><br><b>Modo de Preparo:</b> Para 1 copo (200 mL): Em um copo com água morna ou fria (180 mL), coloque 2 colheres de sopa (26 g) de Ninho Forti+ Zero Lactose e misture bem. Para 1 Litro: Em uma jarra com água morna ou fria (900 mL), coloque 10 colheres de sopa (130 g) de Ninho Forti+ Zero Lactose e misture bem. Utilizar somente água previamente fervida ou filtrada. Rendimento: 380 g = 2,9 Litros (14 copos).<br><br><br></p>','<p><b></b><u></u>ninho <u></u>zero<b></b> lactose forti+ e fortificado com ferro, zinco e vitaminas a, c e d, essenciais para a nutricao das criancas.<br><br><b>ingredientes:</b> leite integral, maltodextrina, soro de leite, enzima lactase, vitaminas (a, d e c), minerais (ferro e zinco) e emulsificante lecitina de soja. nao contem gluten.<br><br><b>modo de preparo:</b> para 1 copo (200 ml): em um copo com agua morna ou fria (180 ml), coloque 2 colheres de sopa (26 g) de ninho forti+ zero lactose e misture bem. para 1 litro: em uma jarra com agua morna ou fria (900 ml), coloque 10 colheres de sopa (130 g) de ninho forti+ zero lactose e misture bem. utilizar somente agua previamente fervida ou filtrada. rendimento: 380 g = 2,9 litros (14 copos).<br><br><br></p>','saude','Alimentos','Leite','0');

insert into "user" ("foreign_key_uid","timestamp","password","terms","type","email", "provider") values ('b0eeb6bb9bd380a11',current_timestamp,md5('123456789'),'1',2,'ana@mail','olissy');

insert into "client" ("foreign_key_user","timestamp","name","last_name","image_icon_path","image_icon_url","sex","birth","cellphone","telephone","country","state_federal","city","neighborhood","street","cep") values (1,current_timestamp,'ana','camargo','/assets/browser/img/platform/avatar.png','/assets/browser/img/platform/avatar.png','f','1990-10-27','5527999066698','2732655548','brasil','espirito santo','guarapari','bela vista','rua itapemirim','29211350');

insert into "store" ("foreign_key_user","timestamp","name","image_icon_path","image_icon_url","image_back_ground_path","image_back_ground_url","country","state_federal","city","neighborhood","street","cep","hours_of_work","email","cellphone","telephone","about","cnpj","quantity_of_product","follow","store_open_or_closed","total_of_sale","authorization_for_open_store","credit","debit","money","delivery_by","delivery_free_above","negotiaterate_delivery","only_in_neighborhood") values (1,current_timestamp,'perto de casa','/assets/browser/img/platform/avatar.png','/assets/browser/img/platform/avatar.png','/src/store','https://cdn.com/ghgh5454gh5gh5g5tt9ghg.jpg','brasil','es','guarapari','bela vista','rua itapemirim','29211350','25 mi','pdc@mail.com','27999665458','2736326226','somos a ....','256625000129',0,0,'1',0,'1','1','1','1','{true,5.88}','{5,25}','{true}','{true}');

insert into "product" ("timestamp","foreign_key_user","foreign_key_warehouse","foreign_key_store","price","product_for_sale","quantities","total_of_love","total_of_sale","total_of_comment") values (current_timestamp,1,1,1,24.2,'1',6,0,0,0);
insert into "product" ("timestamp","foreign_key_user","foreign_key_warehouse","foreign_key_store","price","product_for_sale","quantities","total_of_love","total_of_sale","total_of_comment") values (current_timestamp,1,2,1,03.8,'1',19,0,0,0);
insert into "product" ("timestamp","foreign_key_user","foreign_key_warehouse","foreign_key_store","price","product_for_sale","quantities","total_of_love","total_of_sale","total_of_comment") values (current_timestamp,1,3,1,18.0,'1',19,0,0,0);

--insert into "order" ("timestamp","foreign_key_store","foreign_key_client","addressfullofclient","name_of_client","last_name_of_client","image_icon_url_of_client","email_of_client","cellphone_of_client","city_of_client","neighborhood_of_client","street_of_client","order_state","name_of_store","image_icon_url_of_store","cellphone_of_store","email_of_store","city_of_store","neighborhood_of_store","street_of_store","cnpj_of_store","store_viewed_the_order","method_payment","inform_change","taxa_of_platform","taxa_delivery_select_by_client_status") values (current_timestamp,1,1,'rua itapemirim sem num','saulo','silva','src/','saulo@mail.com','99041192','guarapari','bela vista','rua itapemirim','send','perto de casa','img.jpg','2799659555','pdc@mail.com','guarapari','bela vista','ariacica','100001250000','1','credit','',0.40,'delivery_by');
--insert into "order" ("timestamp","foreign_key_store","foreign_key_client","addressfullofclient","name_of_client","last_name_of_client","image_icon_url_of_client","email_of_client","cellphone_of_client","city_of_client","neighborhood_of_client","street_of_client","order_state","name_of_store","image_icon_url_of_store","cellphone_of_store","email_of_store","city_of_store","neighborhood_of_store","street_of_store","cnpj_of_store","store_viewed_the_order","method_payment","inform_change","taxa_of_platform","taxa_delivery_select_by_client_status") values (current_timestamp,1,3,'rua azul claro, ipiranga','maelly','batista','src/','maelly@mail.com','552799333655','guarapari','ipiranga','rua azul claro','send','perto de casa','img.jpg','2799659555','pdc@mail.com','guarapari','bela vista','ariacica','100001250000','1','credit','',0.40,'delivery_free_above');

--insert into "order_note" ("timestamp","foreign_key_order","name","text","view") values (current_timestamp,1,'saulo','ola','0');

--insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,1,1,'leite em pó',29.35,1,1);
--insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,2,1,'leite em pó',29.35,2,1);
--insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,2,2,'sorvete de chocolate',17.35,2,1);

--insert into "order_taxa_delivery_select_by_client" ("timestamp","foreign_key_order","description","value","taxa","km") values (current_timestamp,1,'entrega por 9 por quilômetro 15 km`','delivery_by',9,15);
--insert into "order_taxa_delivery_select_by_client" ("timestamp","foreign_key_order","description","value","taxa","km") values (current_timestamp,2,'entrega grátis acima de r$30 por 10km quilômetro`','delivery_free_above',0,10);


create or replace view get_order_client_view as 
select 
	"app"."public"."order".*,	
	
	(
		select  sum("app"."public"."order_product"."price" * "app"."public"."order_product"."quantity") + ("app"."public"."order"."taxa_of_platform")
		from "app"."public"."order_product"
		where  "app"."public"."order_product"."foreign_key_order" = "app"."public"."order"."primary_key"
	) as "total_order_value",

    to_json(
		order_taxa_delivery_select_by_client
	) as "taxa_delivery_select_by_client",

	(
	    select  json_agg(order_product.*)
		from "app"."public".order 
		inner  join "app"."public".order_product 
		on app.public.order_product."foreign_key_order" = app.public.order."primary_key"
		where  "app"."public".order."foreign_key_client" = app.public.user."primary_key" 
	) as "product"

from 
	"app"."public".user,
	"app"."public".client,
	"app"."public".order,
	"app"."public".order_taxa_delivery_select_by_client
where   
	app.public.client."foreign_key_user" = app.public.user."primary_key"
and     
	app.public.order."foreign_key_client" = app.public.client."primary_key"
and     
	app.public.order_taxa_delivery_select_by_client."foreign_key_order" = app.public.order."primary_key"
and     
	app.public.user."type" = 1;
--and     
	--app.public.order."foreign_key_client" = 3;
	
CREATE TYPE type_order_client AS 
(
	"PRIMARY_KEY"                           int,  
	"TIMESTAMP"                             timestamp,  
	"FOREIGN_KEY_STORE"                     int,  
	"FOREIGN_KEY_CLIENT"                    int,  
	"addressFullOfClient"                   text,   
	"name_of_client"                        text, 
	"lastNameOfClient"                      text,   
	"imageIconUrlOfClient"                  text,  
	"email_of_client"                       text,   
	"cellphone_of_client"                   text,  
	"city_of_client"                        text,   
	"neighborhood_of_client"                text,  
	"street_of_client"                      text,  
	"order_state"                           text,  
	"name_of_store"                         text,  
	"imageIconUrlOfStore"                   text,  
	"cellphone_of_store"                    text, 
	"email_of_store"                        text,   
	"city_of_store"                         text, 
	"neighborhood_of_store"                 text, 
	"street_of_store"                       text, 
	"cnpj_of_store"                         text, 
	"store_viewed_the_order"                boolean, 
	"method_payment"                        text, 
	"inform_change"                         text, 
	"taxa_of_platform"                      numeric, 
	"total_order_value"                     numeric, 
	"taxa_delivery_select_by_client_status" text, 
	"taxa_delivery_select_by_client"        json, 
	"product"                               json
);
/*   -----------      */ 
create or replace function get_order_client_fn(IN_foreign_key_client int) returns SETOF type_order_client as $$
declare
    id integer := IN_foreign_key_client;
begin
	return query select 
	    "primary_key", 
	    "timestamp", 
	    "foreign_key_store", 
	    "foreign_key_client", 
	    "addressfullofclient",  
	    "name_of_client",
	    "last_name_of_client",  
	    "image_icon_url_of_client", 
	    "email_of_client",  
	    "cellphone_of_client", 
	    "city_of_client",  
	    "neighborhood_of_client", 
	    "street_of_client", 
	    "order_state", 
	    "name_of_store", 
	    "image_icon_url_of_store", 
	    "cellphone_of_store",
	    "email_of_store",  
	    "city_of_store",
	    "neighborhood_of_store",
	    "street_of_store",
	    "cnpj_of_store",
	    "store_viewed_the_order",
	    "method_payment",
	    "inform_change",
	    "taxa_of_platform",
        "total_order_value", 
	    "taxa_delivery_select_by_client_status", 
	    "taxa_delivery_select_by_client", 
	    "product"             
	from get_order_client_view 
	where "foreign_key_client" = id;
end;
$$ language plpgsql;

CREATE TYPE type_create_new_account AS 
(
	"primary_key_user"   INTEGER,
	"primary_key_client" INTEGER,
	"status_message"     text,  
	"status_code"        INTEGER
);


/*   -----------      */ 


CREATE OR REPLACE FUNCTION create_new_account_fn(primary_key_uid text, name text, email text, password text, provider text)RETURNS SETOF type_create_new_account AS $$
DECLARE
    primary_key_user   int := 0;
    primary_key_client int := 0;
BEGIN

	IF password IS NULL OR password = '' THEN
	    password := 'f0eebC99-6B.a11_';
	END IF;

	IF primary_key_uid IS NULL OR primary_key_uid = '' THEN
	    return query select primary_key_user, primary_key_client, upper('primary_key_uid_is_null'), '500'::INTEGER;
	END IF;

	INSERT INTO public."user"("foreign_key_uid","timestamp","password","terms","type","email", "provider") 
	VALUES (primary_key_uid,current_timestamp,md5(password),'1',1,email,provider) 
	RETURNING  primary_key INTO  primary_key_user;
	
	INSERT INTO "client" ("foreign_key_user","timestamp","name","last_name","image_icon_path","image_icon_url","sex","birth","cellphone","telephone","country","state_federal","city","neighborhood","street","cep") 
	VALUES (primary_key_user,current_timestamp,name, null, '/assets/browser/img/platform/avatar.png','/assets/browser/img/platform/avatar.png', null, null, null, null, null, null, null, null, null, null) 
	RETURNING  primary_key INTO  primary_key_client;

	return query select   primary_key_user, primary_key_client, upper('create_new_account_success'), '200'::INTEGER;


     
    EXCEPTION WHEN OTHERS THEN  return query select '0'::INTEGER, '0'::INTEGER, SQLERRM::TEXT, SQLSTATE::INTEGER;
   
END;
$$ LANGUAGE plpgsql;


/*   -----------      */ 
CREATE OR REPLACE FUNCTION email_informed_exists_fn(email_of_user text)RETURNS boolean AS $$
DECLARE

begin  

   IF EXISTS (select *  from public.user where email = email_of_user) THEN
      RETURN true;
   ELSE
      RETURN false;
    END IF;

END;
$$ LANGUAGE plpgsql;

/*   -----------      */ 
/*
CREATE OR REPLACE FUNCTION get_user_client_store_fn(foreign_key_uid_user text)RETURNS TABLE("user" json, client json, store json) AS $$
DECLARE

begin  

return query select 
        json_agg(app.public.user.*),
        json_agg(app.public.client.*),
    	json_agg(app.public.store.*)

from 
	"app"."public".user,
	"app"."public".client

LEFT OUTER JOIN "app"."public".store ON 
       (app.public.client."foreign_key_user" = app.public.store."foreign_key_user")   
WHERE   
	app.public.client."foreign_key_user" = app.public.user."primary_key"
AND     
	app.public.user."foreign_key_uid" = foreign_key_uid_user;

END;
$$ LANGUAGE plpgsql;
*/
CREATE OR REPLACE FUNCTION get_user_client_store_fn(foreign_key_uid_user text)RETURNS TABLE("user" json, client json, store json) AS $$
DECLARE

begin  

return query select 
			json_agg(users.*),
			json_agg(client.*),
			json_agg(store.*)
	from(
	   select app.public.user.* from "app"."public".user
	)users

	LEFT OUTER JOIN 
	(     
	  select  app.public.client.*, TO_CHAR(app.public.client.birth, 'YYYY.MM.DD') as birth from "app"."public".client
	 
	) client
	on (users.primary_key = client.foreign_key_user)

	LEFT OUTER JOIN 
	(     
	  select app.public.store.* from "app"."public".store
	) store
	on (store.foreign_key_user = users.primary_key)

	WHERE users."foreign_key_uid" = foreign_key_uid_user;

END;
$$ LANGUAGE plpgsql;

/*   -----------      */ 

CREATE OR REPLACE FUNCTION increment_fn(entity text)RETURNS boolean AS $$
begin  

    IF entity = 'store' THEN
      UPDATE public.increment SET store = (store + 1);
      RETURN true;
    END IF;

    IF entity = 'warehouse' THEN
      UPDATE public.increment SET warehouse = (warehouse + 1);
      RETURN true;
    END IF;

    IF entity = 'createNewAccount' THEN
      UPDATE public.increment SET "user" = ("user" + 1);
      UPDATE public.increment SET client = (client + 1);
      RETURN true;
    END IF;

RETURN false;

END;
$$ LANGUAGE plpgsql;

/*   -----------      */
CREATE TYPE type_query_product AS 
(
	"product"   jsonb,
	"warehouse" jsonb,
	"store"     jsonb
);
CREATE OR REPLACE FUNCTION query_product()RETURNS SETOF type_query_product AS $$
DECLARE
    primary_key_user   int := 0;

begin  
	return query select to_jsonb(product), to_jsonb(warehouse),  to_jsonb(store)
	    from product, warehouse, store  
        where product.foreign_key_warehouse = warehouse.primary_key 
		and   product.foreign_key_user = store.foreign_key_user;

END;
$$ LANGUAGE plpgsql;

/*
//array_to_json
//array_agg
//to_jsonb
//to_json
//row_to_json
//json_agg
//json_build_object('warehouse',warehouse) 
*/
select * from get_order_client_view where "foreign_key_client" = 3;
select * from get_order_client_fn(3);
select * from email_informed_exists_fn('saulo@mail') as existed;
select * from create_new_account_fn('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'maike', 'may@gmail.com', '98456321', 'olissy') LIMIT 1;
select * from public.user order by primary_key desc;
select * from get_user_client_store_fn('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
select product, (warehouse || jsonb_build_object('showDescription', false)) as warehouse,store from query_product();