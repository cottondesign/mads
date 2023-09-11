---
layout: default

menu:
  - category-header: Dinner Menu
    subsections:
      - subsection-header: Snacks
        # show-subsection-header: false
        items:
          - name: Popcorn
            price: 12.00
            description: '**rotating flavors**'
            note: '!!FIRE!!'
          - name: Long Division
            price: 12.00
            description: '**rotating flavors**'
            note: '!!FIRE!!'
  - category-header: Cocktails
    subsections:
      - subsection-header: ''
      # - subsection-header: On Ice sdfsdfksdf
        # show-subsection-header: false
        items:
          - name: Offshore Account
            price: 15
            description: Cognac, Pistachio, Banana Oil, Orange Blossom
            note: '!!FIRE!!'
          - name: Long Division
            price: 15
            description: Gin, Salers Aperitif, Amargo Valet, Combier
            note: '**test**'
          - name: Cookie Magneto
            price: 15
            description: Moonshine, Falernum, Creme de cacao, Demerara, vanilla, clarified Chips Ahoy Milk, Mole bitters
            note:
          - name: Mercy Me
            price: 14
            description: Rum Blend, Gold Apricot, toasted coconut cream, calamansi
            note: test
          - name: Fins and Suits
            price: 15
            description: Aquavit, Cucumber, Sunflower seed orgeat, lemon
            note: test
          - name: Fins and Suits
            price: 15
            description: Aquavit, Cucumber, Sunflower seed orgeat, lemon
            note: test
          - name: Fins and Suits
            price: 15
            description: Aquavit, Cucumber, Sunflower seed orgeat, lemon
            note: test
          - name: Fins and Suits
            price: 15
            description: Aquavit, Cucumber, Sunflower seed orgeat, lemon
            note: test
          - name: Fins and Suits
            price: 15
            description: Aquavit, Cucumber, Sunflower seed orgeat, lemon
            note: test

space-areas:
  - name: Bar
    description: Bar lorem ipsum dolor sit amet, consectetur adipiscing elit, sed  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mauris commodo quis.Risus sed odio ut enim.
    coming-soon: false
    images:
      - path: /assets/images/bg1.jpg
      - path: /assets/images/bg4.jpg
      - path: /assets/images/bg8.jpg
      - path: /assets/images/bg7.jpg
      # - path: /assets/images/test2.jpg
  - name: Mezzanine
    description: Mezzanine lorem ipsum dolor sit amet, consectetur adipiscing elit, sed  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mauris commodo quis.Risus sed odio ut enim.
    coming-soon: false
    images:
      - path: /assets/images/bg2.jpg
      - path: /assets/images/bg11.jpg
      - path: /assets/images/bg17.jpg
      - path: /assets/images/bg18.jpg
      - path: /assets/images/test2.jpg
  - name: Dining Room
    description: Dining Room lorem ipsum dolor sit amet, consectetur adipiscing elit, sed  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mauris commodo quis.Risus sed odio ut enim.
    coming-soon: false
    images:
      - path: /assets/images/bg3.jpg
      - path: /assets/images/bg10.jpg
      - path: /assets/images/bg13.jpg
      - path: /assets/images/bg14.jpg
      # - path: /assets/images/test2.jpg
  - name: Private Room
    description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet mauris commodo quis.Risus sed odio ut enim.
    coming-soon: true


events-body: | 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  
  Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Eget gravida cum sociis natoque penatibus et magnis dis.

  Email with this info:<br>
  (1) What kind of event is it<br>
  (2) Estimated head count<br>
  (3) Time
hours:
  - day: Monday
    open: false
    from: 5PM
    to: 4AM
  - day: Tuesday
    open: false
    from: 5PM
    to: 4AM
  - day: Wednesday
    open: true
    from: 5PM
    to: 4AM
  - day: Thursday
    open: true
    from: 5PM
    to: 4AM
  - day: Friday
    open: true
    from: 5PM
    to: 4AM
  - day: Saturday
    open: true
    from: 2PM
    to: 4AM
  - day: Sunday
    open: true
    from: 2PM
    to: 4AM
reservations-body: Email info@madelines.nyc for parties of X, otherwise walk in.
---
<div class="carousel-container" id="carouselContainer">
  <div class="carousel" id="carousel">
    {% for space-area in page.space-areas %}
      {% for image in space-area.images %}
        <div class="carousel-image">
          <img src="{{ image.path }}" alt="{{ space-area.name }} Image" class="{{ space-area.name | slugify }}" data="{{ space-area.name | slugify }}">
        </div>
      {% endfor %}
    {% endfor %}
    <div class="carousel-image">
      <img src="{{ page.space-areas[0].images[0].path }}" alt="" class="{{ page.space-areas[0].name | slugify }} last" data="{{ page.space-areas[0].name | slugify }}">
    </div>
  </div>
</div>
<div class="receipt-container" id="receiptContainer">
  <span class="x">x</span>
  <div class="receipt-top">
    <!-- header -->
    <div class="receipt-header">
      <p class="receipt-header-name">
        <a href="#"><span>-</span>MADELINE'S<span>-</span></a>
      </p>
      <p class="receipt-header-address">
        <a href="#"><span>-</span>113 Franklin Street<span>-</span><br><span>-</span>Greenpoint, BK<span>-</span></a>
      </p>
      <p class="receipt-header-email">
        <a href=""><span>-</span>info@madelinesnyc.com<span>-</span></a>
      </p>
    </div>
    <!-- subheader -->
    <div class="divider-double-bar">====================================</div>
    <div class="receipt-sub-header">
      <p class="table">Table:<span id=table>T7</span></p>
      <p class="dine-in">Dine In</p>
    </div>
    <div class="divider-single-bar sub-header-single-bar">------------------------------------</div>
    <!-- nav menu -->
    <div class="nav">
      <!-- food and drinks -->
      <section class="nav-item" id="foodAndDrinks">
      <div class="food-and-drinks-inner section-inner">
        <div class="section-header food-and-drinks-header-default">
          <h1 id="foodAndDrinksText">* food and drinks</h1>
          <span class="nav-button" id="foodAndDrinksButton">-</span>
        </div>
        <div class="section-header food-and-drinks-header-back click">
          <h1 class="click">< back</h1>
        </div>
        <div class="section-body">
          <div class="food-and-drinks-subnav">
            <div class="menu-single-bar">------------------------------------</div>
            {% for menu-category in page.menu %}
            <div class="submenu-nav">
              <h1><a href="#{{ menu-category.category-header | slugify}}">{{ menu-category.category-header }}</a></h1>
              <button class="submenu-button submenu-close-button">-</button>
            </div>
            <div class="menu-single-bar">------------------------------------</div>
            {% endfor %}
          </div>
          {% for menu-category in page.menu %}
          <div class="food-and-drinks-subheader" id="{{ menu-category.category-header | slugify}}">
            <div class="menu-subheader-top-nav click">
              <span class="food-and-drinks-back-button click"><</span>
            </div>
            <div class="menu-single-bar">------------------------------------</div>
            <div class="food-and-drinks-subheader-title">
              <h1>{{ menu-category.category-header }}</h1>
              <button class="submenu-button submenu-open-button">=</button>
            </div>
            <div class="menu-single-bar">
              ------------------------------------
            </div>
          </div>
            {% for menu-subsection in menu-category.subsections %}
            {% if menu-subsection.subsection-header != '' %}
            <br>
            <div class="menu-subheader">
              <h2>
                ----[{{ menu-subsection.subsection-header }}]------------------------
              </h2>
            </div>
            {% endif %}
              {% for item in menu-subsection.items %}
              <div class="menu-item">
                <br>
                <div class="menu-item-header">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.price }}</p>
                </div>
                <div class="menu-item-description">
                  <p>{{ item.description }}</p>
                </div>
                {% if item.note %}
                <span class="menu-note">{{ item.note }}</span>
                {% endif %}
              </div>
              {% endfor %}
            {% endfor %}
          {% endfor %}
        </div>
        </div>
      <div class="divider-single-bar">------------------------------------</div>
      </section>
      <!-- the space -->
      <section class="nav-item" id="theSpace">
        <div class="thespace-inner section-inner">
          <div class="section-header click" id="theSpaceHeader">
            <h1 class="click">the space</h1>
            <span class="click" id="theSpaceButton"></span>
            <!-- <span class="nav-button" id="theSpaceButton">-</span>
            <span class="nav-button" id="theSpaceButtonHover">></span> -->
          </div>
          <div class="space-single-bar">------------------------------------</div>
          <div class="section-body">
            <div class="the-space-arrows">
              <button class="arrow arrow-left"><</button>
              <button class="arrow arrow-right">></button>
            </div>
            <div class="space-single-bar">------------------------------------</div>
            {% for space-area in page.space-areas %}
            {% if space-area.coming-soon == false %}
            <div class="space-section" id="{{ space-area.name | slugify}}">
              <div class="space-section-inner">
                <div class="space-header">
                  <h1 class="space-header-title">
                    {{ space-area.name }}
                  </h1>
                  <span class="see-more">+</span>
                  <span class="see-less">-</span>
                </div>
                <div class="space-body">
                  {{ space-area.description }}
                </div>
              </div>
              <div class="space-single-bar">----------------------------------</div>
            </div>
            {% else %}
            <div class="space-section coming-soon" id="{{ space-area.name | slugify}}">
            <div class="space-section-inner">
              <div class="space-header">
                <h1 class="space-header-title">
                  {{ space-area.name }} - <span>Coming Soon</span>
                </h1>
              </div>
              </div>
            </div>
            {% endif %}
            {% if forloop.last == false %}
            <!-- <div class="space-single-bar">----------------------------------</div> -->
            {% endif %}
            {% endfor %}
          </div>
        </div>
        <!-- <div class="space-single-bar">------------------------------------</div> -->
        <div class="divider-single-bar">------------------------------------</div>
      </section>
      <!-- events -->
      <section class="nav-item" id="events">
        <div class="events-inner section-inner">
          <div class="section-header">
            <h1>* events</h1>
            <span class="nav-button" id="eventsButton">-</span>
          </div>
          <div class="section-body">
          {{page.events-body | markdownify}}
          </div>
        </div>
        <div class="divider-single-bar">------------------------------------</div>
      </section>
      <!-- hours -->
      <section class="nav-item" id="hours">
        <div class="hours-inner section-inner">
          <div class="section-header">
            <h1>
              <span id="storeStatus">* open now</span>
              <span id="storeClosingTime">closes 4am</span>
            </h1>
            <span class="nav-button" id="hoursButton">-</span>
          </div>
          <div class="section-body">
            <table class="schedule">
              <colgroup>
                <col span="1" style="width: 33.33%">
                <col span="1" style="width: 66.66%">
              </colgroup>
              <tbody>
                {% for day in page.hours %}
                <tr>
                  <td>{{ day.day }}</td>
                  {% if day.open == false %}
                  <td>CLOSED</td>
                  {% else %}
                  <td>{{ day.from }} – {{ day.to }}</td>
                  {% endif %}
                </tr>
                {% endfor %}
                <!-- <tr>
                  <td>Monday</td>
                  <td>CLOSED</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>CLOSED</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>5PM — 4AM</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>5PM — 4AM</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>5PM — 4AM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>2PM - 4AM</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>2PM - 4AM</td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </div>
        <div class="divider-single-bar">------------------------------------</div>
      </section>
      <!-- reservations -->
      <section class="nav-item reservations" id="reservations">
        <div class="reservations-inner section-inner">
          <div class="section-header">
            <h1>* reservations</h1>
            <span class="nav-button" id="reservationsButton">-</span>
          </div>
          <div class="section-body">
            <p>
              {{page.reservations-body}}
            </p>
          </div>          
        </div>
      <div class="divider-single-bar">------------------------------------</div>
      </section>
    </div>
  </div>
  <div class="receipt-bottom">
    <!-- footer -->
    <div class="receipt-footer">
      <img class="logo" id="logo" src="/assets/images/Full-Logo-Black.png" alt="Madeline's Logo Black">
      <div>
        X___________________________________
      </div>
      <div class="receipt-footer-text">
        <p>
          MADELINE'S
        </p>
        <p>Follow us @madelinesnyc</p>
        <br>
        <p>THANK YOU :)</p>
      </div>
    </div>
  </div>
</div>