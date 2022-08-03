# Fejlesztői dokumentáció

## Használt technológiák

### TypeScript

 A Typescript egy Microsoft által fejlesztett és fenntartott
 programozási nyelv. A JavaScript-nek úgynevezett superset-je, amely a
 JavaScriptet szigorú szintaktikával és erős típusossággal egészíti ki.
 A superset, vagyis "szülő-halmaz" azt foglalja magába, hogy minden
 JavaScript program valid Typescript program is egyben, viszont ez a
 reláció, ellenkező irányban nem érvényes. Ennek értelmében a
 TypeScript egy típusos és compiler által fordított programozási nyelv,
 akár a C++ vagy a Java. A compiler egy extra lépést helyez a kód írása
 és futtatása közé, mivel a böngészők nem tudnak TypeScript kódot
 futtatni, ezért a TypeScript kód JavaScriptre fordul, ezen a lépcsőn
 történnek szintaktikai- és típusellenőrzés, melyek nagymértékben
 megemelik az írott kód minőségét és csökkentik a futási hibák
 kialakulását. Az erős típusosság további előnyei közé tartozik,
 például az alkalmazások skálázhatósága. Ha többen dolgoznak egy adott
 projekten elősegíti a kód olvashatósága és magabiztosabb használatát.
 A kód írás fázisában is hasznosnak bizonyul mivel a legtöbb
 progresszív szövegszerkesztők vagy az integrált fejlesztői környezetek
 (IDE), jelzik az esetleges hibákat vagy akár utalásokkal segíthetik a
 fejlesztőt.

### MySql

 A MySQL egy nyílt forráskódú relációs adatbázis-kezelő rendszer
 (RDBMS). A relációs adatbázis egy vagy több adattáblába rendezi az
 adatokat, amelyekben az adattípusok kapcsolatban lehetnek egymással;
 ezek a kapcsolatok segítenek az adatok strukturálásában. Az SQL egy
 olyan nyelv, amelyet a relációs adatbázis adatainak létrehozására
 használnak, módosítására és kivonására, valamint az adatbázishoz való
 felhasználói hozzáférés

 ellenőrzésére. A relációs adatbázisok és az SQL mellett az olyan
 RDBMS, mint pélául a MySQL, egy operációs rendszerrel együttműködve
 relációs adatbázist valósít meg a számítógép tároló rendszerében,
 kezeli a felhasználókat, lehetővé teszi a hálózati hozzáférést, és
 megkönnyíti az adatbázis integritásának tesztelését és a biztonsági
 másolatok létrehozását.

### NestJS

 A Nest (NestJS) egy keretrendszer a hatékony, skálázható Node.js
 szerveroldali alkalmazások felépítéséhez. Progresszív JavaScript-et
 használ, TypeScript-ben lett fejlesztve és teljes mértékben támogatja
 az (mégis lehetővé teszi a fejlesztők számára hogy "tiszta"
 JavaScript-ben fejlesszenek). Emellett egyesíti az OOP
 (Objektumorientált programozás), az FP (Funkcionális programozás) és
 az FRP (Funkcionális reaktív programozás) elemeit. A fedél alatt a
 Nest olyan robusztus HTTP Server keretrendszereket használ, mint az
 Express (ez az alapértelmezett), és opcionálisan konﬁgurálható a
 Fastify használatára is. A Nest egy absztrakciós réteget biztosít ezen
 általános Node.js keretrendszerek felett (Express / Fastify), de az
 API-aikat is közvetlenül a fejlesztő elé tárja. Ez lehetővé teszi a
 fejlesztők számára, hogy számtalan harmadik féltől származó modult
 használhassanak.

### TypeORM

 A TypeORM egy Object Relational Mapping (ORM) keretrendszer.
 Általánosságban elmondható, hogy az Objektum rész az alkalmazásban
 lévő tartományra / modellre, a Relációs rész a Relációs
 adatbázis-kezelő rendszer tábláinak (pl. Oracle, MySQL, MS-SQL,
 PostgreSQL stb.) közötti kapcsolatára utal, végül a leképezés rész a
 modell és a táblák áthidalásának aktusa. Az ORM egy olyan típusú
 eszköz, amely az entitásokat adatbázis-táblákkal térképezi fel. Az ORM
 egyszerűsített fejlesztési folyamatot biztosít az objektumok közötti
 átalakítás automatizálásával. A TypeORM nagyon rugalmas,
 elvonatkoztatja a adatbázis rendszert az alkalmazástól, és lehetővé teszi 
 számunkra az OOP koncepció használatának előnyeit.

## Adatréteg

 Az adatbázis a számítógépben tárolt adatok összessége. Ezek az adatok
 általában úgy vannak felépítve, hogy könnyen hozzáférhetőek legyenek.
 A relációs adatbázis egyfajta adatbázis. Olyan struktúrát használ,
 amely lehetővé teszi számunkra az adatok azonosítását és hozzáférését
 az adatbázis többi adatához. A relációs adatbázis adatait gyakran
 táblákba rendezzük. A táblák

 több száz, ezer, néha akár milliónyi adatsort is tartalmazhatnak.
 Ezeket a sorokat gyakran rekordoknak nevezzük. A tábláknak több
 oszlopuk lehet. Az oszlopok leíró névvel vannak ellátva és
 meghatározott adattípusúak. A relációs adatbázis-kezelő rendszer
 (RDBMS) egy olyan program, amely lehetővé teszi relációs adatbázis
 létrehozását, frissítését és adminisztrációját. A legtöbb relációs
 adatbázis-kezelő rendszer az SQL nyelvet használja az adatbázis
 eléréséhez.

 Az SQL (Structured Query Language) egy olyan programozási nyelv,
 amelyet a relációs adatbázis-kezelő rendszerben tárolt adatokkal
 kommunikálnak. Az SQL szintaxis hasonló az angol nyelvhez, ami
 viszonylag megkönnyíti az írást, az olvasást és az értelmezést. Sok
 RDBMS az SQL-t (és az SQL variációit) használja a táblázatok adatainak
 eléréséhez.

 A MySQL a legnépszerűbb nyílt forráskódú SQL adatbázis. Jellemzően
 webalkalmazások fejlesztésére használják. A MySQL fő előnyei, hogy
 könnyen használható, olcsó, megbízható (1995 óta létezik), és nagy a
 fejlesztői közösség, amely segíthet a kérdések megválaszolásában.

### Adatbázisterv

 Az alkalmazás az előbb említett MySQL relációs adatbázist használja,
 mely a következő táblákból áll. *Product, Category, User, Address,
 Order, Checkout.* A TypeORM adottságaiból kifolyóan a táblák
 létrehozásához a kódbázison belül, úgynevezett Entity-ket hozunk
 létre, amelyekben megadjuk a tábla létrehozásához szükséges
 információkat. Az Entity osztályokat az Entity() dekorátorral
 jelezzük, melyben az osztály adattagjai a táblák osztopainak
 feleltethetőek meg.

 Az adatbázis táblái között az 1-N vagy N-1 (egy a sokhoz vagy sok az
 egyhez) kapcsolat ﬁgyelhető meg. A kapcsolatokat az Entity osztályokon
 belül a OneToMany() illetve a ManyToOne() dekotátorral jelezzük az
 TypeORM számára, amely a tábla létrehozásakor kiegészíti az adott
 táblát a kapcsolatot reprezentáló oszloppal.



### Adatbázis táblák leírása

![image23](https://user-images.githubusercontent.com/48122593/182591615-d0af0b60-6f5e-4c69-9e6d-f2515a1dd9a9.png)

#### User

![image24](https://user-images.githubusercontent.com/48122593/182591617-632a4ab8-5ea9-43df-8252-d91c19ca6533.png)

A felhasználók tábla a következő adatokat tartalmazza: *Egyedi azonosító, e-mail cím,* amely egyben a user felhasználóneve is, *jelszó,* amit a táblába való beszúrás előtt bcrypt-el titkosítunk, illetve a felhasználó *szerepköre.*

#### Address

![image25](https://user-images.githubusercontent.com/48122593/182591619-8b1b5357-b094-4c65-b632-b8ad07b2ed58.png)

**Product**

![image26](https://user-images.githubusercontent.com/48122593/182591620-34e26726-b6e5-4cf8-aefa-dcb3c9b2facb.png)

A termék tábla tartalmaz minden a termékhez szükséges információt. Ennek értelmében szerepel benne a termék *egyedi azonosítója,* a termék *formalgazója, neve,* illetve *típusa.* Továbbá az *alkoholtartalom, göngyöleg, méret, termék leírása* és az árhoz kapcsolódó információk, *nettó-, bruttó-, gyöngeleg ára.*
A szállítási cím tábla tartalmazza a felhaszók által megadott szállítási címeket. Egy cím rendelkezik *egyedi azonosítóval, országgal, megyével, várossal, irányítószámmal, utcaszámmal,* illetve *telefonszámmal.*

#### Category

![image27](https://user-images.githubusercontent.com/48122593/182591625-de19c169-25e5-4e69-8a95-ab07ff41053e.png)

A kategória táblában tároljuk a termék kategóriák adatait. Melyek közé tartozik az *egyedi azonosító,* a kategória *neve,* illetve *megjelenítési neve.* Továbbá *leírás* és egy *sorszám* *mező*, amelynek segítségével rendezhetjük, illetve sorba állíthatjuk a kategóriákat.

#### Order

 ![image28](https://user-images.githubusercontent.com/48122593/182591628-c54f3485-0228-4590-9cec-8d17b8ab647e.png)
 
 A rendelés tábla tartalmazza a rendelés *egyedi azonosítóját,* illetve a *darabszámot.*

#### Checkout

![image29](https://user-images.githubusercontent.com/48122593/182591631-7046fcb2-075e-4b82-8290-ed28a550857c.png)

 A Checkout az adatbázisban egy véglegesített rendelést reprezentál, amely áll egy *egyedi azonosítóból,* illetve egy *szállítási mód-ból.*

## Backend

 A szerveroldalon egy REST API alkalmazásunk van.

 Az API egy deﬁníciók és protokollok összessége az alkalmazás
 felépítéséhez és integrálásához. Az API az alkalmazásprogramozási
 felületet jelenti (Application Programming Interface). Az API-ok
 lehetővé teszik, hogy a termékünk vagy szolgáltatásunk kommunikáljon
 más termékekkel és szolgáltatásokkal anélkül, hogy tudnia kellene,
 hogy ezek hogyan vannak megvalósítva. Ez leegyszerűsítheti az
 alkalmazás fejlesztését. Amikor új eszközöket és termékeket tervezünk
 - vagy meglévőket kezelünk -, az API-ok rugalmasságot biztosítanak,
 egyszerűsítik a tervezést, az adminisztrációt, illetve a használatot,
 továbbá lehetőséget nyújtanak a további az innovációra.

 Az API-okat szokás szerződéseknek tekinteni, adott dokumentációval,
 amely a felek közötti megállapodást képviselik: Ha az 1. fél kérelmet
 küld egy meghatározott módon, akkor a 2. fél szoftvere reagálni fog.
 Röviden, az API-k lehetővé teszik az erőforrásokhoz való hozzáférést a
 biztonság és az irányíthatóság fenntartása mellett. A hozzáférések
 menedzselése a feljlesztőre van biza.

 A REST API (más néven RESTful API) egy olyan alkalmazásprogramozási
 felület, amely megfelel a REST architektúra megszorításainak, és
 lehetővé teszi a RESTful webszolgáltatásokkal való interakciót. A REST
 a reprezentációs állapot átvitel jelenti (Representational State
 Transfer).

 Röviden, ha kapcsolatba akarunk lépni egy számítógéppel vagy
 rendszerrel információk beolvasása vagy funkciók végrehajtása
 céljából, az API segít lekommunikálni, azt amit szeretnénk az adott
 rendszertől, hogy megértse és teljesítse a kérésünket.

 A REST egy architektúra, nem protokoll vagy szabvány. Az
 API-fejlesztők a REST-et számos módon megvalósíthatják.

 Amikor egy klienskérést RESTful API-on keresztül teszünk meg, akkor az
 erőforrás állapotának reprezentációját továbbítja a kérelmezőnek vagy
 a végpontnak. Ezeket az információkat vagy ábrázolásokat a HTTP-n
 keresztül többféle formátumban továbbítják: JSON (Javascript Object
 Notation), HTML, XLT, Python, PHP vagy egyszerű szöveg. Ezek közül a
 JSON a leggyakrabban használt amely könnyen olvasható mind az emberek,
 mind a számítógép számára.

 Mindezek mellett a fejlécek és a paraméterek szintén fontosak a
 RESTful API HTTP-metódusaiban, mivel ezek fontos azonosító
 információkat tartalmaznak a kérés metaadatairól, jogosultságairól,
 stb.

 Ahhoz, hogy az API-t RESTful-nak lehessen tekinteni, meg kell felelnie
 az alábbi kritériumoknak:

-   Kliens-szerver architektúra kliensekből, szerverből és
     erőforrásokból áll, HTTP-n keresztül kezelt kérésekkel.

-   Állapottalan kliens-szerver kommunikáció, vagyis a kérések között
     nem tárolódnak kliens információk, és minden egyes kérés
     független.

-   Gyorsítótárazott adatok, amelyek megkönnyítik az kliens-szerver
     interakciókat.

-   Egységes interfész a komponensek között, hogy az információkat
     szabványos formában továbbítsák. Ezt megköveteli az, hogy:

    -   a kért erőforrások azonosíthatók és elkülöníthetőek a kliensnek
         küldött ábrázolásoktól.

    -   az erőforrásokat a kliens manipulálhatja a kapott reprezentáción
         keresztül, mert a reprezentáció elegendő információt tartalmaz
         ehhez.

    -   a kliensnek visszaküldött üzenetek elegendő információval
         rendelkeznek ahhoz , hogy a kliens tudja hogyan dolgozza fel
         azokat.

 Bár a REST API-nak meg kell felelnie ezeknek a kritériumoknak, mégis
 könnyebben kezelhető, mint egy előírt protokoll, például a SOAP
 (Simple Object Access Protocol), amelynek speciális követelményei
 vannak, mint például az XML-üzenetküldés, valamint a beépített
 biztonsági és tranzakciós megfelelés, amely a sebesség és a könnyed
 használhatóság rovására válik.

 Ezzel szemben a REST olyan irányelvek összessége, amelyek szükség
 szerint megvalósíthatóak, így a REST API-ok gyorsabbá és könnyedebbé
 válnak, illetve fokozott skálázhatósággal tökéletesen alkalmasak web-
 és mobil alkalmazások fejlesztésére.

#### NestJS architektúrája

 A NestJS egy szerveroldali keretrendszer skálázható alkalmazások
 létrehozásához. Absztrakcióként funkcionál a rajta alapuló HTTP
 szerver könyvtár felett. Jelenleg két könyvtárat támogat - az Express
 és a Fastify -, miközben továbbra is lehetővé teszi a fejlesztők
 számára, hogy szükség esetén saját API-okat használjanak.

 Ennél is fontosabb, hogy az Angular-szerű modulok, szolgáltatások és
 vezérlők bevezetésével egy adott architektúra használatára
 szorgalmazza a fejlesztőket, biztosítva, hogy az alkalmazás
 nagymértékben skálázható és tesztelhető legyen. A nagyszabású
 alakamazásokon általában egy csapat dolgozik, csapatban dolgozni pedig
 egy részt azt jelenti, hogy rengeteg preferencia van

 jelen a tagokat illetően az alkalmazás felépítésének módjával
 kapcsolatban. Ezek legtöbb esetben eltérőek egymástól, a kódbázis
 minőségének romlásához vezet , zűrzavart és általában gyenge
 karbantarthatóságot produkálva.

 Ennek kiküszöbölése érdekében a Nest szabványosított irányelveket ad
 meg, meghatározva egy robosztus architektúrát, amelyet a csapat minden
 fejlesztőjének követnie kell. Az eredmény egy könnyen karbantartható
 kódbázis. A Nest elvonatkoztatja a kapcsolatot a rajta alapuló
 könyvtárakkal, mint például az Express vagy a Fastify, néhány egyszerű
 építőelem bevezetésével, amelyek közül a legfontosabbak a modulok, a
 szolgáltatók és a vezérlők.

#### Modulok/Modules

 A Modul egy osztály, amely egy \@Module() dekorátorral van
 megjegyezve. A \@Module() dekorátor olyan metaadatokat biztosít,
 amelyeket a Nest felhasznál az alkalmazás struktúrájának rendezéséhez.

 Minden alkalmazásnak van legalább egy modulja, egy gyökér-modul. A
 gyökér-modul az a kiindulási pont, amelyet a Nest használ az
 alkalmazás gráfjának felépítéséhez, belső adatstruktúra és a
 szolgáltató kapcsolatainak, illetve függőségeinek feloldására.Fontos
 kiemelni, hogy a modulok használata erősen ajánlott, mivel ez egy
 hatékony módszer az elemek szervezésére. Így a legtöbb alkalmazás
 esetében az adott architektúra több modult fog alkalmazni, amelyek
 összessége szorosan kapcsolódik egymáshoz

#### Szolgáltatók/Providers

 A szolgáltatók a Nest alapvető konstrukciói közé tartozik. Az alapvető
 Nest osztályok közül számos szolgáltatóként kezelhető például a
 service-ek, a repository-k, illetve a factory-k. A szolgáltató
 alapvető elve, hogy képes függőségeket injektálni. Ez azt jelenti,
 hogy az objektumok különféle kapcsolatokat létesíthetnek egymással.

#### Vezérlők/Controllers

 A vezérlők felelősek a beérkező kérések kezeléséért és a válaszok
 vissza juttatásáért a kliensnek. A vezérlő célja, hogy az alkalmazás
 felé irányuló kéréseket fogadja . Az "útválasztási" routing
 mechanizmus vezérli, hogy melyik vezérlő mely kéréseket fogadja.
 Gyakran a vezérlőknek több útvonaluk van, és a különböző útvonalak
 különböző műveleteket hajthatnak végre.

 Egy vezérlő osztály létrehozásakor dekorátorokat használunk. A
 dekorátorok szükséges metaadatokat társítanak az osztályhoz, és
 lehetővé teszik a Nest számára, hogy útválasztási térképet hozzon
 létre (kéréseket kapcsoljon a megfelelő vezérlőhöz).

### Autentikáció

 Az autentikáció vagy hitelesítés a legtöbb alkalmazás elengedhetetlen
 része. Sokféle megközelítés és stratégia létezik a hitelesítés
 kezelésére.

 A Passport a legnépszerűbb node.js authentikációs könyvtár, amely a
 közösség által jól ismer és számos production-kész alkalmazás
 hitelesítési rétegét képezi. Ezt a könyvtárat meglehetősen kényelmes
 egy Nest alkalmazásba integrálni, a Passport Module segítségével. A
 Passport magas szinten számos lépést hajt végre:

-   Hitelesít egy felhasználót \"hitelesítő adatainak\" (például
     felhasználónév / jelszó vagy JSON web-token (JWT) ellenőrzésével.

-   Hitelesített állapot kezelése (például JWT kiadásával vagy Express
     session létrehozásával)

-   Csatolja a hitelesített felhasználóval kapcsolatos információkat a
     Request objektumhoz az útvonalkezelőkben történő további
     felhasználáshoz

 A Passport gazdag ökoszisztéma-stratégiákkal rendelkezik, amelyek
 különféle hitelesítési mechanizmusokat valósítanak meg. Az
 alkalmazásban két stratégia

 lett implementálva. Az első a Local Strategy amely a bejelentkezési
 végpontot védi és a felhasználó hitelesítő adatait vizsgálja. Miután a
 Local Strategy elvégezte a hitelesítést a felhasználó bejelentkezett
 állapotba kerül és kap egy JWT token-t. A JSON Web Token (JWT) egy
 nyílt szabvány (RFC 7519), amely kompakt és önálló módszert határoz
 meg az információk biztonságos továbbításához a felek között JSON
 objektumként. Ez az információ ellenőrizhető és megbízható, mert
 "digitálisan alá van írva". A JWT-ket alá lehet írni egy titkos (HMAC
 algoritmussal) vagy egy nyilvános / privát kulcspár segítségével RSA
 vagy ECDSA segítségével. Itt jön képbe a másik implantált stratégia a
 JWT Strategy, amely a bejelentkezett felhasználók valid JWT tokenjét
 vizsgálja. Egy JWT Token saját beállítás szerint 8 óráig érvényes, így
 a JWT Strategy gonosdodik arról, hogy a felhasználó a bejelentkezés
 után csak 8 óráig férhessen hozzá a védett végpontokhoz. A 8 óra
 lejárta után új bejelentkezés szükséges.

### Szolgáltatók bemutatása

 Az *Adatbázis táblák* fejezetben említett entitásokra a TypeORM által
 biztosított Repository-k segítségével tudunk hivatkozni. Ezekkel a
 Repository-kal fogunk a szolgáltató metódusainkban dolgozni.

#### User Service

 A User Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndByEmail(email), ﬁndForJwt(loginUserDto), ﬁndByCheckout(checkoutId),
 ﬁndGuests(), ﬁndAdmin(), create(createUserDto), updateRole(),* illetve
 *delete(id).* A felhasználók esetében különösen fontos az úgynevezett
 DTO-k használata (Data Transfer Object), mivel lekérdezésekkor nem
 szeretnénk azt egész entitást visszakapni, mivel az tartalmazza a
 felhasználó jelszavát, még ha az titkosítva is van nem szeretnénk,
 hogy az bármilyen módon is kiszivárogna ezért létrehozunk egy
 UserDTO-t, ami implementálható osztály vagy interface ként és
 tartalmazza azokat az adatokat amelyekre szükségünk van egy lekérdezés
 során. Továbbá a DTO-k használata javít a kód minőségén mivel

 előre deﬁniálva vannak a válasz objektumok, így tudjuk, hogy a
 végpontjaink pontosan milyen adatot fognak szolgálni, ez a szemlélet
 meglehetősen passzol a TypeScript vonásaihoz.

-   **ﬁndAll():** Visszaadja a táblában szereplő összes felhasználót.

-   **ﬁndByEmail(email):** Visszaadja a felhasználót a megadott e-mail
     cím szerint.

-   **ﬁndForJwt(loginUserDto):** JWT számára készített segéd metódus,
     amely visszaadja a felhasználót és egy loginUserDto-t vár, ami
     magába foglalja a felhasználó e-mail címét és jelszavát.

-   **ﬁndByCheckout(checkoutId):** Visszaad egy felhasználót egy adott
     véglegesített rendelés szerint.

-   **ﬁndGuest():** Visszaadja a VENDÉG felhasználókat.

-   **ﬁndAdmin():** Visszaadja az ADMIN felhasználót.

-   **create(createUserDto):** Létrehoz egy felhasználót az adott
     createUserDto szerint, ami magába foglalja a felhasználó e-mail
     címét, jelszavát és szerepkörét.

-   **updateRole(id):** Megváltoztatja egy adott felhasználó
     szerepkörét.

-   **delete(id):** Törli az adott felhasználót.

#### Product Service

 A Product Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndOne(id), ﬁndAllByCatgory(categoryId),
 create(categoryId,productCreateDto), update(id,productDto),* illetve
 delete*(id).*

-   **ﬁndAll():** Visszaadja a táblában szereplő összes terméket.

-   **ﬁndOne(id):** Visszaadja a terméket a megadott azonosító szerint.

-   **ﬁndAllByCheckout(checkoutId):** Visszaadja az adott kategóriához
     tartozó összes terméket.

-   **create(categoryId, createProductDto):** Létrehoz egy terméket a
     megadott createProductDto szerint, amely tartalmazza a termék

 információkat. Emellett vár egy kategória azonosítót, ami a termék
 létrehozásakor az adott kategóriához kapcsolja azt.

-   **update(id, productDto):** Frissíti az adott terméket, a megadott
     productDto szerint.

-   **delete(id):** Törli az adott terméket.

#### Category Service

 A Category Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndOne(id), create(categoryCreateDto), update(id,categoryDto).*

-   **ﬁndAll():** Visszaadja a táblában szereplő összes kategóriát.

-   **ﬁndOne(id):** Visszaadja a kategóriát a megadott azonosító
     szerint.

-   **ﬁndAllByCheckout(checkoutId):** Visszaadja az adott kategóriához
     tartozó összes terméket.

-   **create(createCategoryDto):** Létrehoz egy kategóriát a megadott
     createCategoryDto szerint, amely tartalmazza a kategória
     információkat.

-   **update(id, categoryDto):** Frissíti az adott kategóriát, a
     megadott categoryDto szerint.

#### Address Service

 Az Address Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndOne(id), ﬁndByUser(userId), ﬁndAdmin(), create(userId,
 createAddressDto).*

-   **ﬁndAll():** Visszaadja a táblában szereplő összes szállítási
     címet.

-   **ﬁndOne(id):** Visszaadja a szállítási címet a megadott azonosító
     szerint.

-   **ﬁndByUser(userId):** Visszaadja az adott felhasználó szállítási
     címét.

-   **create(userId, createAddressDto):** Létrehoz egy szállítási címet
     a megadott createAddressDto szerint, amely tartalmazza a
     szállítási cím adatait, továbbá vár egy felhasználó azonosítót,
     amely segítésgével a létrehozáskor az adott felhasználóhoz
     kacpsolj a szállítási címet.

#### Order Service

 Az Order Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndByCheckout(checkoutId), create(createOrderDto), delete(id).*

-   **ﬁndAll():** Visszaadja a táblában szereplő összes rendelést.

-   **ﬁndAllByCheckout(checkoutId):** Visszaadja az adott véglegesített
     rendeléshez tartozó összes rendelést.

-   **create(createOrderDto):** Létrehoz egy rendelést a megadott
     createOrderDto szerint, amely tartalmazza a rendelés
     információkat.

-   **delete(id):** Törli az adott rendelést.

#### Checkout Service

 A Checkout Service a következő metódusokkal rendelkezik: *ﬁndAll(),
 ﬁndOne(id), create(createCheckoutDto), delete(id).*

-   **ﬁndAll():** Visszaadja a táblában szereplő összes véglegesített
     rendelést.

-   **ﬁndOne(id):** Visszaadja a véglegesített rendelést a megadott
     azonosító szerint.

-   **create(createCheckoutDto):** Létrehoz egy véglegesített rendelést
     a megadott createCheckoutDto szerint, amely tartalmazza a
     véglegesített rendelés információkat.

-   **delete(id):** Törli az adott véglegesített rendelést.

### Végpontok bemutatása

#### Publikus végpontok

-   POST auth/signup: Felhasználó regisztrálás.

-   POST auth/signin: Felhasználó bejelentkezése.

-   GET product/: Termékek lekérdezése.

-   GET product/id/get: Termék lekérdezése.

-   GET product/categoryId/category: Termék lekérdezése kategória
     szerint.

-   GET category/: Kategóriák lekérdezése.

-   GET category/id/get: Kategória lekérdezése.

-   GET user/ﬁlepath/getﬁle: Felhasználóhoz tartozó működési engedély
     lekérdezése.

#### Védett végpontok

-   GET user/: Felhasználók lekérdezése.

-   GET user/guests: VENDÉG felhasználók lekérdezése.

-   GET user/checkoutId/checkout: Egy adott véglegesített rendeléshez
     tartozó felhasználó lekérdezése.

-   GET user/id./get: Felhasználó lekérdezése.

-   PUT user/id/appove: Felhasználó szerepkörének megváltoztatása.

-   DELETE user/id/delete: Felhasználó törlése.

-   POST user/upload: Működési engedély feltöltése.

-   GET user/ﬁlepath/getﬁle: Felhasználóhoz tartozó működési engedély
     lekérdezése.

-   POST product/categoryId/create: Termék létrehozása.

-   PUT product/id/update: Termék frissítése.

-   DELETE product/id/delete: Termék törlése.

-   GET order/: Rendelések lekérdezése.

-   GET order/checkoutId/checkout: Rendelés lekérdezése az adott
     véglegesített rendelés szerint.

-   POST order/create: Rendelés létrehozása.

-   DELET order/id/delete: Rendelés törlése.

-   GET checkout/: Véglegesített rendelések lekérdezése.

-   POST checkout/create: Véglegesített rendelés létrehozása.

-   DELET checkout/id/delete: Véglegesített rendelés törlése.

-   POST category/create: Kategória létrehozása.

-   PUT checkout/id/update: Kategória frissítése.

-   GET address/: Szállítási címek lekérdezése.

-   GET address/admin: Admin szállítási cím lekérdezése.

-   GET address/id/get: Szállítási cím lekérdezése.

-   GET address/userId/user: Adott felhasználóhoz tartozó szállítási cím
     lekérdezése.

-   POST address/create: Szállítási cím létrehozása.
