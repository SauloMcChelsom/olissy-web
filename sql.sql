DROP VIEW public.get_order_client_view cascade;

DROP FUNCTION public.get_order_client_fn(integer) cascade;
DROP FUNCTION public.create_new_account_fn(text, text, text, text, text) CASCADE;
DROP FUNCTION public.email_informed_exists_fn(text) CASCADE;
DROP FUNCTION public.get_user_client_store_fn(text) cascade;

DROP TYPE type_order_client cascade;
DROP TYPE type_create_new_account cascade;

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
	"cellphone"       text          null, 
	"telephone"       text          null, 
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

insert into "company" ("timestamp","name","name_search") values (current_timestamp,'néstle','nestle');
insert into "company" ("timestamp","name","name_search") values (current_timestamp,'kibóm','kibom');

insert into "warehouse" ("timestamp","company","image_url","image_path","price","name","name_for_search","description","description_for_search","session","category","type","and_generic") values (current_timestamp,1,'src/1','hhh/img2225.jpg',23.35,'leite em pó','leite em po','leite ninho em pó da néstle ...','leite ninho em po da nestle ...','alimentos','emlatados','leite','0');
insert into "warehouse" ("timestamp","company","image_url","image_path","price","name","name_for_search","description","description_for_search","session","category","type","and_generic") values (current_timestamp,1,'src/1','hhh/img2225.jpg',17.10,'sorvete de chocolate','sorvete de chocolate','sabor gelado ...','sabor gelado ...','alimentos','gelados','sorvete','0');

insert into "user" ("foreign_key_uid","timestamp","password","terms","type","email", "provider") values ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',current_timestamp,md5('123'),'1',1,'saulo@mail','olissy');
insert into "user" ("foreign_key_uid","timestamp","password","terms","type","email", "provider") values ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',current_timestamp,md5('123'),'1',2,'ana@mail','olissy');
insert into "user" ("foreign_key_uid","timestamp","password","terms","type","email", "provider") values ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',current_timestamp,md5('123'),'1',1,'maelly@mail','olissy');

insert into "client" ("foreign_key_user","timestamp","name","last_name","image_icon_path","image_icon_url","sex","birth","cellphone","telephone","country","state_federal","city","neighborhood","street","cep") values (1,current_timestamp,'saulo','silva','/src/client','https://cdn.com/14556456466fr56f65f56ff.jpg','m','1990-10-27','5527999041192','2732620415','brasil','espirito santo','guarapari','bela vista','rua itapemirim','29211350');
insert into "client" ("foreign_key_user","timestamp","name","last_name","image_icon_path","image_icon_url","sex","birth","cellphone","telephone","country","state_federal","city","neighborhood","street","cep") values (2,current_timestamp,'ana','camargo','/src/client','https://cdn.com/566fg5g6f5ggf56g565.jpg','f','1990-10-27','5527999066698','2732655548','brasil','espirito santo','guarapari','bela vista','rua itapemirim','29211350');
insert into "client" ("foreign_key_user","timestamp","name","last_name","image_icon_path","image_icon_url","sex","birth","cellphone","telephone","country","state_federal","city","neighborhood","street","cep") values (3,current_timestamp,'maelly','batista','/src/client','https://cdn.com/56456g4gfgf56gruyipo.jpg','f','1993-09-11','552799333655','2732625559','brasil','espirito santo','guarapari','ipiranga','rua azul claro','29116325');

insert into "store" ("foreign_key_user","timestamp","name","image_icon_path","image_icon_url","image_back_ground_path","image_back_ground_url","country","state_federal","city","neighborhood","street","cep","hours_of_work","email","cellphone","telephone","about","cnpj","quantity_of_product","follow","store_open_or_closed","total_of_sale","authorization_for_open_store","credit","debit","money","delivery_by","delivery_free_above","negotiaterate_delivery","only_in_neighborhood") values (2,current_timestamp,'perto de casa','/src/store','https://cdn.com/hg5h4ghg45h45g4h45gh45.jpg','/src/store','https://cdn.com/ghgh5454gh5gh5g5tt9ghg.jpg','brasil','es','guarapari','bela vista','rua itapemirim','29211350','25 mi','pdc@mail.com','27999665458','2736326226','somos a ....','256625000129',0,0,'1',0,'1','1','1','1','{true,5.88}','{5,25}','{true}','{true}');

insert into "product" ("timestamp","foreign_key_user","foreign_key_warehouse","foreign_key_store","price","product_for_sale","quantities","total_of_love","total_of_sale","total_of_comment") values (current_timestamp,2,1,1,29.35,'1',6,0,0,0);
insert into "product" ("timestamp","foreign_key_user","foreign_key_warehouse","foreign_key_store","price","product_for_sale","quantities","total_of_love","total_of_sale","total_of_comment") values (current_timestamp,2,2,1,17.35,'1',19,0,0,0);


insert into "order" ("timestamp","foreign_key_store","foreign_key_client","addressfullofclient","name_of_client","last_name_of_client","image_icon_url_of_client","email_of_client","cellphone_of_client","city_of_client","neighborhood_of_client","street_of_client","order_state","name_of_store","image_icon_url_of_store","cellphone_of_store","email_of_store","city_of_store","neighborhood_of_store","street_of_store","cnpj_of_store","store_viewed_the_order","method_payment","inform_change","taxa_of_platform","taxa_delivery_select_by_client_status") values (current_timestamp,1,1,'rua itapemirim sem num','saulo','silva','src/','saulo@mail.com','99041192','guarapari','bela vista','rua itapemirim','send','perto de casa','img.jpg','2799659555','pdc@mail.com','guarapari','bela vista','ariacica','100001250000','1','credit','',0.40,'delivery_by');
insert into "order" ("timestamp","foreign_key_store","foreign_key_client","addressfullofclient","name_of_client","last_name_of_client","image_icon_url_of_client","email_of_client","cellphone_of_client","city_of_client","neighborhood_of_client","street_of_client","order_state","name_of_store","image_icon_url_of_store","cellphone_of_store","email_of_store","city_of_store","neighborhood_of_store","street_of_store","cnpj_of_store","store_viewed_the_order","method_payment","inform_change","taxa_of_platform","taxa_delivery_select_by_client_status") values (current_timestamp,1,3,'rua azul claro, ipiranga','maelly','batista','src/','maelly@mail.com','552799333655','guarapari','ipiranga','rua azul claro','send','perto de casa','img.jpg','2799659555','pdc@mail.com','guarapari','bela vista','ariacica','100001250000','1','credit','',0.40,'delivery_free_above');

insert into "order_note" ("timestamp","foreign_key_order","name","text","view") values (current_timestamp,1,'saulo','ola','0');

insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,1,1,'leite em pó',29.35,1,1);
insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,2,1,'leite em pó',29.35,2,1);
insert into "order_product" ("timestamp","foreign_key_order","foreign_key_product","name","price","quantity","stayed_in_store") values (current_timestamp,2,2,'sorvete de chocolate',17.35,2,1);

insert into "order_taxa_delivery_select_by_client" ("timestamp","foreign_key_order","description","value","taxa","km") values (current_timestamp,1,'entrega por 9 por quilômetro 15 km`','delivery_by',9,15);
insert into "order_taxa_delivery_select_by_client" ("timestamp","foreign_key_order","description","value","taxa","km") values (current_timestamp,2,'entrega grátis acima de r$30 por 10km quilômetro`','delivery_free_above',0,10);


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
	VALUES (primary_key_user,current_timestamp,name, null, null, null, null, null, null, null, null, null, null, null, null, null) 
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

select * from get_order_client_view where "foreign_key_client" = 3;
select * from get_order_client_fn(3);
select * from email_informed_exists_fn('saulo@mail') as existed;
select * from create_new_account_fn('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'maike', 'may@gmail.com', '98456321', 'olissy') LIMIT 1;
select * from public.user order by primary_key desc;
select * from get_user_client_store_fn('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')