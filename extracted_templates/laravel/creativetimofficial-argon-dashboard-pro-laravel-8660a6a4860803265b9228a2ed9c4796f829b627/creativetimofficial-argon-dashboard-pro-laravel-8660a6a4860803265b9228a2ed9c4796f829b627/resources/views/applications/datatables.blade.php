@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'DataTables'])
            <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
                <a href="javascript:;" class="nav-link p-0">
                    <div class="sidenav-toggler-inner">
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                        <i class="sidenav-toggler-line bg-white"></i>
                    </div>
                </a>
            </div>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here...">
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">
                    <li class="nav-item d-flex align-items-center">
                        @include('auth.logout')
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                                <i class="sidenav-toggler-line bg-white"></i>
                            </div>
                        </a>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0">
                            <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                        </a>
                    </li>
                    <li class="nav-item position-relative pe-2 d-flex align-items-center">
                        <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-bell cursor-pointer"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="../../assets/img/team-2.jpg" class="avatar avatar-sm  me-3 "
                                                alt="user image">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New message</span> from Laur
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                13 minutes ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="../../assets/img/small-logos/logo-spotify.svg"
                                                class="avatar avatar-sm bg-gradient-dark  me-3 " alt="logo spotify">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                <span class="font-weight-bold">New album</span> by Travis Scott
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                1 day
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                                            <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                                <title>credit-card</title>
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF"
                                                        fill-rule="nonzero">
                                                        <g transform="translate(1716.000000, 291.000000)">
                                                            <g transform="translate(453.000000, 454.000000)">
                                                                <path class="color-background"
                                                                    d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                    opacity="0.593633743"></path>
                                                                <path class="color-background"
                                                                    d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z">
                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm font-weight-normal mb-1">
                                                Payment successfully completed
                                            </h6>
                                            <p class="text-xs text-secondary mb-0">
                                                <i class="fa fa-clock me-1"></i>
                                                2 days
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4">
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header">
                        <h5 class="mb-0">Datatable Simple</h5>
                        <p class="text-sm mb-0">
                            A lightweight, extendable, dependency-free javascript HTML table plugin.
                        </p>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-flush" id="datatable-basic">
                            <thead class="thead-light">
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Position
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Office
                                    </th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Age</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Start
                                        date</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Salary
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-sm font-weight-normal">Tiger Nixon</td>
                                    <td class="text-sm font-weight-normal">System Architect</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2011/04/25</td>
                                    <td class="text-sm font-weight-normal">$320,800</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Garrett Winters</td>
                                    <td class="text-sm font-weight-normal">Accountant</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">63</td>
                                    <td class="text-sm font-weight-normal">2011/07/25</td>
                                    <td class="text-sm font-weight-normal">$170,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Ashton Cox</td>
                                    <td class="text-sm font-weight-normal">Junior Technical Author</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">66</td>
                                    <td class="text-sm font-weight-normal">2009/01/12</td>
                                    <td class="text-sm font-weight-normal">$86,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Cedric Kelly</td>
                                    <td class="text-sm font-weight-normal">Senior Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2012/03/29</td>
                                    <td class="text-sm font-weight-normal">$433,060</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Airi Satou</td>
                                    <td class="text-sm font-weight-normal">Accountant</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">33</td>
                                    <td class="text-sm font-weight-normal">2008/11/28</td>
                                    <td class="text-sm font-weight-normal">$162,700</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Brielle Williamson</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2012/12/02</td>
                                    <td class="text-sm font-weight-normal">$372,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Herrod Chandler</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">59</td>
                                    <td class="text-sm font-weight-normal">2012/08/06</td>
                                    <td class="text-sm font-weight-normal">$137,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Rhona Davidson</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">55</td>
                                    <td class="text-sm font-weight-normal">2010/10/14</td>
                                    <td class="text-sm font-weight-normal">$327,900</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Colleen Hurst</td>
                                    <td class="text-sm font-weight-normal">Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">39</td>
                                    <td class="text-sm font-weight-normal">2009/09/15</td>
                                    <td class="text-sm font-weight-normal">$205,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Sonya Frost</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">23</td>
                                    <td class="text-sm font-weight-normal">2008/12/13</td>
                                    <td class="text-sm font-weight-normal">$103,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jena Gaines</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2008/12/19</td>
                                    <td class="text-sm font-weight-normal">$90,560</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Quinn Flynn</td>
                                    <td class="text-sm font-weight-normal">Support Lead</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2013/03/03</td>
                                    <td class="text-sm font-weight-normal">$342,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Charde Marshall</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">36</td>
                                    <td class="text-sm font-weight-normal">2008/10/16</td>
                                    <td class="text-sm font-weight-normal">$470,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Haley Kennedy</td>
                                    <td class="text-sm font-weight-normal">Senior Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">43</td>
                                    <td class="text-sm font-weight-normal">2012/12/18</td>
                                    <td class="text-sm font-weight-normal">$313,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Tatyana Fitzpatrick</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">19</td>
                                    <td class="text-sm font-weight-normal">2010/03/17</td>
                                    <td class="text-sm font-weight-normal">$385,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michael Silva</td>
                                    <td class="text-sm font-weight-normal">Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">66</td>
                                    <td class="text-sm font-weight-normal">2012/11/27</td>
                                    <td class="text-sm font-weight-normal">$198,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Paul Byrd</td>
                                    <td class="text-sm font-weight-normal">Chief Financial Officer (CFO)</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2010/06/09</td>
                                    <td class="text-sm font-weight-normal">$725,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gloria Little</td>
                                    <td class="text-sm font-weight-normal">Systems Administrator</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">59</td>
                                    <td class="text-sm font-weight-normal">2009/04/10</td>
                                    <td class="text-sm font-weight-normal">$237,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Bradley Greer</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">41</td>
                                    <td class="text-sm font-weight-normal">2012/10/13</td>
                                    <td class="text-sm font-weight-normal">$132,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Dai Rios</td>
                                    <td class="text-sm font-weight-normal">Personnel Lead</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">35</td>
                                    <td class="text-sm font-weight-normal">2012/09/26</td>
                                    <td class="text-sm font-weight-normal">$217,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jenette Caldwell</td>
                                    <td class="text-sm font-weight-normal">Development Lead</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2011/09/03</td>
                                    <td class="text-sm font-weight-normal">$345,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Yuri Berry</td>
                                    <td class="text-sm font-weight-normal">Chief Marketing Officer (CMO)</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">40</td>
                                    <td class="text-sm font-weight-normal">2009/06/25</td>
                                    <td class="text-sm font-weight-normal">$675,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Caesar Vance</td>
                                    <td class="text-sm font-weight-normal">Pre-Sales Support</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">21</td>
                                    <td class="text-sm font-weight-normal">2011/12/12</td>
                                    <td class="text-sm font-weight-normal">$106,450</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Doris Wilder</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">Sidney</td>
                                    <td class="text-sm font-weight-normal">23</td>
                                    <td class="text-sm font-weight-normal">2010/09/20</td>
                                    <td class="text-sm font-weight-normal">$85,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Angelica Ramos</td>
                                    <td class="text-sm font-weight-normal">Chief Executive Officer (CEO)</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/10/09</td>
                                    <td class="text-sm font-weight-normal">$1,200,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gavin Joyce</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">42</td>
                                    <td class="text-sm font-weight-normal">2010/12/22</td>
                                    <td class="text-sm font-weight-normal">$92,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jennifer Chang</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">28</td>
                                    <td class="text-sm font-weight-normal">2010/11/14</td>
                                    <td class="text-sm font-weight-normal">$357,650</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Brenden Wagner</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">28</td>
                                    <td class="text-sm font-weight-normal">2011/06/07</td>
                                    <td class="text-sm font-weight-normal">$206,850</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Fiona Green</td>
                                    <td class="text-sm font-weight-normal">Chief Operating Officer (COO)</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">48</td>
                                    <td class="text-sm font-weight-normal">2010/03/11</td>
                                    <td class="text-sm font-weight-normal">$850,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Shou Itou</td>
                                    <td class="text-sm font-weight-normal">Regional Marketing</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">20</td>
                                    <td class="text-sm font-weight-normal">2011/08/14</td>
                                    <td class="text-sm font-weight-normal">$163,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michelle House</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">Sidney</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2011/06/02</td>
                                    <td class="text-sm font-weight-normal">$95,400</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Suki Burks</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">53</td>
                                    <td class="text-sm font-weight-normal">2009/10/22</td>
                                    <td class="text-sm font-weight-normal">$114,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Prescott Bartlett</td>
                                    <td class="text-sm font-weight-normal">Technical Author</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">27</td>
                                    <td class="text-sm font-weight-normal">2011/05/07</td>
                                    <td class="text-sm font-weight-normal">$145,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gavin Cortez</td>
                                    <td class="text-sm font-weight-normal">Team Leader</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2008/10/26</td>
                                    <td class="text-sm font-weight-normal">$235,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Martena Mccray</td>
                                    <td class="text-sm font-weight-normal">Post-Sales support</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">46</td>
                                    <td class="text-sm font-weight-normal">2011/03/09</td>
                                    <td class="text-sm font-weight-normal">$324,050</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Unity Butler</td>
                                    <td class="text-sm font-weight-normal">Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/12/09</td>
                                    <td class="text-sm font-weight-normal">$85,675</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Howard Hatfield</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">51</td>
                                    <td class="text-sm font-weight-normal">2008/12/16</td>
                                    <td class="text-sm font-weight-normal">$164,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Hope Fuentes</td>
                                    <td class="text-sm font-weight-normal">Secretary</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">41</td>
                                    <td class="text-sm font-weight-normal">2010/02/12</td>
                                    <td class="text-sm font-weight-normal">$109,850</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Vivian Harrell</td>
                                    <td class="text-sm font-weight-normal">Financial Controller</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">62</td>
                                    <td class="text-sm font-weight-normal">2009/02/14</td>
                                    <td class="text-sm font-weight-normal">$452,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Timothy Mooney</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2008/12/11</td>
                                    <td class="text-sm font-weight-normal">$136,200</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jackson Bradshaw</td>
                                    <td class="text-sm font-weight-normal">Director</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">65</td>
                                    <td class="text-sm font-weight-normal">2008/09/26</td>
                                    <td class="text-sm font-weight-normal">$645,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Olivia Liang</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2011/02/03</td>
                                    <td class="text-sm font-weight-normal">$234,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Bruno Nash</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">38</td>
                                    <td class="text-sm font-weight-normal">2011/05/03</td>
                                    <td class="text-sm font-weight-normal">$163,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Sakura Yamamoto</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2009/08/19</td>
                                    <td class="text-sm font-weight-normal">$139,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Thor Walton</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2013/08/11</td>
                                    <td class="text-sm font-weight-normal">$98,540</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Finn Camacho</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/07/07</td>
                                    <td class="text-sm font-weight-normal">$87,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Serge Baldwin</td>
                                    <td class="text-sm font-weight-normal">Data Coordinator</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2012/04/09</td>
                                    <td class="text-sm font-weight-normal">$138,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Zenaida Frank</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">63</td>
                                    <td class="text-sm font-weight-normal">2010/01/04</td>
                                    <td class="text-sm font-weight-normal">$125,250</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Zorita Serrano</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">56</td>
                                    <td class="text-sm font-weight-normal">2012/06/01</td>
                                    <td class="text-sm font-weight-normal">$115,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jennifer Acosta</td>
                                    <td class="text-sm font-weight-normal">Junior Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">43</td>
                                    <td class="text-sm font-weight-normal">2013/02/01</td>
                                    <td class="text-sm font-weight-normal">$75,650</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Cara Stevens</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">46</td>
                                    <td class="text-sm font-weight-normal">2011/12/06</td>
                                    <td class="text-sm font-weight-normal">$145,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Hermione Butler</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2011/03/21</td>
                                    <td class="text-sm font-weight-normal">$356,250</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Lael Greer</td>
                                    <td class="text-sm font-weight-normal">Systems Administrator</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">21</td>
                                    <td class="text-sm font-weight-normal">2009/02/27</td>
                                    <td class="text-sm font-weight-normal">$103,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jonas Alexander</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2010/07/14</td>
                                    <td class="text-sm font-weight-normal">$86,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Shad Decker</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">51</td>
                                    <td class="text-sm font-weight-normal">2008/11/13</td>
                                    <td class="text-sm font-weight-normal">$183,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michael Bruce</td>
                                    <td class="text-sm font-weight-normal">Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">29</td>
                                    <td class="text-sm font-weight-normal">2011/06/27</td>
                                    <td class="text-sm font-weight-normal">$183,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Donna Snider</td>
                                    <td class="text-sm font-weight-normal">Customer Support</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">27</td>
                                    <td class="text-sm font-weight-normal">2011/01/25</td>
                                    <td class="text-sm font-weight-normal">$112,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <!-- Card header -->
                    <div class="card-header">
                        <h5 class="mb-0">Datatable Search</h5>
                        <p class="text-sm mb-0">
                            A lightweight, extendable, dependency-free javascript HTML table plugin.
                        </p>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-flush" id="datatable-search">
                            <thead class="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-sm font-weight-normal">Tiger Nixon</td>
                                    <td class="text-sm font-weight-normal">System Architect</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2011/04/25</td>
                                    <td class="text-sm font-weight-normal">$320,800</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Garrett Winters</td>
                                    <td class="text-sm font-weight-normal">Accountant</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">63</td>
                                    <td class="text-sm font-weight-normal">2011/07/25</td>
                                    <td class="text-sm font-weight-normal">$170,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Ashton Cox</td>
                                    <td class="text-sm font-weight-normal">Junior Technical Author</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">66</td>
                                    <td class="text-sm font-weight-normal">2009/01/12</td>
                                    <td class="text-sm font-weight-normal">$86,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Cedric Kelly</td>
                                    <td class="text-sm font-weight-normal">Senior Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2012/03/29</td>
                                    <td class="text-sm font-weight-normal">$433,060</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Airi Satou</td>
                                    <td class="text-sm font-weight-normal">Accountant</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">33</td>
                                    <td class="text-sm font-weight-normal">2008/11/28</td>
                                    <td class="text-sm font-weight-normal">$162,700</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Brielle Williamson</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2012/12/02</td>
                                    <td class="text-sm font-weight-normal">$372,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Herrod Chandler</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">59</td>
                                    <td class="text-sm font-weight-normal">2012/08/06</td>
                                    <td class="text-sm font-weight-normal">$137,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Rhona Davidson</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">55</td>
                                    <td class="text-sm font-weight-normal">2010/10/14</td>
                                    <td class="text-sm font-weight-normal">$327,900</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Colleen Hurst</td>
                                    <td class="text-sm font-weight-normal">Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">39</td>
                                    <td class="text-sm font-weight-normal">2009/09/15</td>
                                    <td class="text-sm font-weight-normal">$205,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Sonya Frost</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">23</td>
                                    <td class="text-sm font-weight-normal">2008/12/13</td>
                                    <td class="text-sm font-weight-normal">$103,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jena Gaines</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2008/12/19</td>
                                    <td class="text-sm font-weight-normal">$90,560</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Quinn Flynn</td>
                                    <td class="text-sm font-weight-normal">Support Lead</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2013/03/03</td>
                                    <td class="text-sm font-weight-normal">$342,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Charde Marshall</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">36</td>
                                    <td class="text-sm font-weight-normal">2008/10/16</td>
                                    <td class="text-sm font-weight-normal">$470,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Haley Kennedy</td>
                                    <td class="text-sm font-weight-normal">Senior Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">43</td>
                                    <td class="text-sm font-weight-normal">2012/12/18</td>
                                    <td class="text-sm font-weight-normal">$313,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Tatyana Fitzpatrick</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">19</td>
                                    <td class="text-sm font-weight-normal">2010/03/17</td>
                                    <td class="text-sm font-weight-normal">$385,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michael Silva</td>
                                    <td class="text-sm font-weight-normal">Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">66</td>
                                    <td class="text-sm font-weight-normal">2012/11/27</td>
                                    <td class="text-sm font-weight-normal">$198,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Paul Byrd</td>
                                    <td class="text-sm font-weight-normal">Chief Financial Officer (CFO)</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2010/06/09</td>
                                    <td class="text-sm font-weight-normal">$725,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gloria Little</td>
                                    <td class="text-sm font-weight-normal">Systems Administrator</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">59</td>
                                    <td class="text-sm font-weight-normal">2009/04/10</td>
                                    <td class="text-sm font-weight-normal">$237,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Bradley Greer</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">41</td>
                                    <td class="text-sm font-weight-normal">2012/10/13</td>
                                    <td class="text-sm font-weight-normal">$132,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Dai Rios</td>
                                    <td class="text-sm font-weight-normal">Personnel Lead</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">35</td>
                                    <td class="text-sm font-weight-normal">2012/09/26</td>
                                    <td class="text-sm font-weight-normal">$217,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jenette Caldwell</td>
                                    <td class="text-sm font-weight-normal">Development Lead</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2011/09/03</td>
                                    <td class="text-sm font-weight-normal">$345,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Yuri Berry</td>
                                    <td class="text-sm font-weight-normal">Chief Marketing Officer (CMO)</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">40</td>
                                    <td class="text-sm font-weight-normal">2009/06/25</td>
                                    <td class="text-sm font-weight-normal">$675,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Caesar Vance</td>
                                    <td class="text-sm font-weight-normal">Pre-Sales Support</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">21</td>
                                    <td class="text-sm font-weight-normal">2011/12/12</td>
                                    <td class="text-sm font-weight-normal">$106,450</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Doris Wilder</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">Sidney</td>
                                    <td class="text-sm font-weight-normal">23</td>
                                    <td class="text-sm font-weight-normal">2010/09/20</td>
                                    <td class="text-sm font-weight-normal">$85,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Angelica Ramos</td>
                                    <td class="text-sm font-weight-normal">Chief Executive Officer (CEO)</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/10/09</td>
                                    <td class="text-sm font-weight-normal">$1,200,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gavin Joyce</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">42</td>
                                    <td class="text-sm font-weight-normal">2010/12/22</td>
                                    <td class="text-sm font-weight-normal">$92,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jennifer Chang</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">28</td>
                                    <td class="text-sm font-weight-normal">2010/11/14</td>
                                    <td class="text-sm font-weight-normal">$357,650</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Brenden Wagner</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">28</td>
                                    <td class="text-sm font-weight-normal">2011/06/07</td>
                                    <td class="text-sm font-weight-normal">$206,850</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Fiona Green</td>
                                    <td class="text-sm font-weight-normal">Chief Operating Officer (COO)</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">48</td>
                                    <td class="text-sm font-weight-normal">2010/03/11</td>
                                    <td class="text-sm font-weight-normal">$850,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Shou Itou</td>
                                    <td class="text-sm font-weight-normal">Regional Marketing</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">20</td>
                                    <td class="text-sm font-weight-normal">2011/08/14</td>
                                    <td class="text-sm font-weight-normal">$163,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michelle House</td>
                                    <td class="text-sm font-weight-normal">Integration Specialist</td>
                                    <td class="text-sm font-weight-normal">Sidney</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2011/06/02</td>
                                    <td class="text-sm font-weight-normal">$95,400</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Suki Burks</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">53</td>
                                    <td class="text-sm font-weight-normal">2009/10/22</td>
                                    <td class="text-sm font-weight-normal">$114,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Prescott Bartlett</td>
                                    <td class="text-sm font-weight-normal">Technical Author</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">27</td>
                                    <td class="text-sm font-weight-normal">2011/05/07</td>
                                    <td class="text-sm font-weight-normal">$145,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Gavin Cortez</td>
                                    <td class="text-sm font-weight-normal">Team Leader</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">22</td>
                                    <td class="text-sm font-weight-normal">2008/10/26</td>
                                    <td class="text-sm font-weight-normal">$235,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Martena Mccray</td>
                                    <td class="text-sm font-weight-normal">Post-Sales support</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">46</td>
                                    <td class="text-sm font-weight-normal">2011/03/09</td>
                                    <td class="text-sm font-weight-normal">$324,050</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Unity Butler</td>
                                    <td class="text-sm font-weight-normal">Marketing Designer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/12/09</td>
                                    <td class="text-sm font-weight-normal">$85,675</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Howard Hatfield</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">51</td>
                                    <td class="text-sm font-weight-normal">2008/12/16</td>
                                    <td class="text-sm font-weight-normal">$164,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Hope Fuentes</td>
                                    <td class="text-sm font-weight-normal">Secretary</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">41</td>
                                    <td class="text-sm font-weight-normal">2010/02/12</td>
                                    <td class="text-sm font-weight-normal">$109,850</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Vivian Harrell</td>
                                    <td class="text-sm font-weight-normal">Financial Controller</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">62</td>
                                    <td class="text-sm font-weight-normal">2009/02/14</td>
                                    <td class="text-sm font-weight-normal">$452,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Timothy Mooney</td>
                                    <td class="text-sm font-weight-normal">Office Manager</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2008/12/11</td>
                                    <td class="text-sm font-weight-normal">$136,200</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jackson Bradshaw</td>
                                    <td class="text-sm font-weight-normal">Director</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">65</td>
                                    <td class="text-sm font-weight-normal">2008/09/26</td>
                                    <td class="text-sm font-weight-normal">$645,750</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Olivia Liang</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2011/02/03</td>
                                    <td class="text-sm font-weight-normal">$234,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Bruno Nash</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">38</td>
                                    <td class="text-sm font-weight-normal">2011/05/03</td>
                                    <td class="text-sm font-weight-normal">$163,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Sakura Yamamoto</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">Tokyo</td>
                                    <td class="text-sm font-weight-normal">37</td>
                                    <td class="text-sm font-weight-normal">2009/08/19</td>
                                    <td class="text-sm font-weight-normal">$139,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Thor Walton</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">61</td>
                                    <td class="text-sm font-weight-normal">2013/08/11</td>
                                    <td class="text-sm font-weight-normal">$98,540</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Finn Camacho</td>
                                    <td class="text-sm font-weight-normal">Support Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2009/07/07</td>
                                    <td class="text-sm font-weight-normal">$87,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Serge Baldwin</td>
                                    <td class="text-sm font-weight-normal">Data Coordinator</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">64</td>
                                    <td class="text-sm font-weight-normal">2012/04/09</td>
                                    <td class="text-sm font-weight-normal">$138,575</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Zenaida Frank</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">63</td>
                                    <td class="text-sm font-weight-normal">2010/01/04</td>
                                    <td class="text-sm font-weight-normal">$125,250</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Zorita Serrano</td>
                                    <td class="text-sm font-weight-normal">Software Engineer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">56</td>
                                    <td class="text-sm font-weight-normal">2012/06/01</td>
                                    <td class="text-sm font-weight-normal">$115,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jennifer Acosta</td>
                                    <td class="text-sm font-weight-normal">Junior Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">43</td>
                                    <td class="text-sm font-weight-normal">2013/02/01</td>
                                    <td class="text-sm font-weight-normal">$75,650</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Cara Stevens</td>
                                    <td class="text-sm font-weight-normal">Sales Assistant</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">46</td>
                                    <td class="text-sm font-weight-normal">2011/12/06</td>
                                    <td class="text-sm font-weight-normal">$145,600</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Hermione Butler</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">47</td>
                                    <td class="text-sm font-weight-normal">2011/03/21</td>
                                    <td class="text-sm font-weight-normal">$356,250</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Lael Greer</td>
                                    <td class="text-sm font-weight-normal">Systems Administrator</td>
                                    <td class="text-sm font-weight-normal">London</td>
                                    <td class="text-sm font-weight-normal">21</td>
                                    <td class="text-sm font-weight-normal">2009/02/27</td>
                                    <td class="text-sm font-weight-normal">$103,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Jonas Alexander</td>
                                    <td class="text-sm font-weight-normal">Developer</td>
                                    <td class="text-sm font-weight-normal">San Francisco</td>
                                    <td class="text-sm font-weight-normal">30</td>
                                    <td class="text-sm font-weight-normal">2010/07/14</td>
                                    <td class="text-sm font-weight-normal">$86,500</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Shad Decker</td>
                                    <td class="text-sm font-weight-normal">Regional Director</td>
                                    <td class="text-sm font-weight-normal">Edinburgh</td>
                                    <td class="text-sm font-weight-normal">51</td>
                                    <td class="text-sm font-weight-normal">2008/11/13</td>
                                    <td class="text-sm font-weight-normal">$183,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Michael Bruce</td>
                                    <td class="text-sm font-weight-normal">Javascript Developer</td>
                                    <td class="text-sm font-weight-normal">Singapore</td>
                                    <td class="text-sm font-weight-normal">29</td>
                                    <td class="text-sm font-weight-normal">2011/06/27</td>
                                    <td class="text-sm font-weight-normal">$183,000</td>
                                </tr>
                                <tr>
                                    <td class="text-sm font-weight-normal">Donna Snider</td>
                                    <td class="text-sm font-weight-normal">Customer Support</td>
                                    <td class="text-sm font-weight-normal">New York</td>
                                    <td class="text-sm font-weight-normal">27</td>
                                    <td class="text-sm font-weight-normal">2011/01/25</td>
                                    <td class="text-sm font-weight-normal">$112,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        @include('layouts.footers.auth.footer')
    </div>
@endsection

@push('js')
    <script src="../../assets/js/plugins/datatables.js"></script>
    <script>
        const dataTableBasic = new simpleDatatables.DataTable("#datatable-basic", {
            searchable: false,
            fixedHeight: true
        });

        const dataTableSearch = new simpleDatatables.DataTable("#datatable-search", {
            searchable: true,
            fixedHeight: true
        });
    </script>
@endpush
