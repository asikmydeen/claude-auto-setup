@extends('layouts.app', ['activePage' => 'panels', 'activeButton' => 'components', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Panels' ])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Collapsible Accordion</h4>
                                <p class="card-category">Bootstrap default style</p>
                            </div>
                            <div class="card-body">
                                <div class="accordions" id="accordion">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a data-target="#collapseOne" href="#" data-toggle="collapse">
                                                    Collapse item 1
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a data-target="#collapseTwo" href="#" data-toggle="collapse">
                                                    Collapse item 2
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a data-target="#collapseThree" href="#" data-toggle="collapse">
                                                    Collapse item 3
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThree" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Collapsible Accordion</h4>
                                <p class="card-category">With hover animation and full width</p>
                            </div>
                            <div class="card-body content-full-width">
                                <div class="accordions" id="accordion">
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a class="collapsed" data-target="#collapseOneHover" href="#" data-toggle="collapse-hover">
                                                    Collapse item 1 with hover active
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOneHover" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a data-target="#collapseTwoHover" href="#" data-toggle="collapse-hover">
                                                    Collapse item 2 with hover active
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwoHover" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">
                                                <a data-target="#collapseThreeHover" href="#" data-toggle="collapse-hover">
                                                    Collapse item 3 with hover active
                                                    <b class="caret"></b>
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThreeHover" class="card-collapse collapse">
                                            <div class="card-body">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Tabs</h4>
                                <p class="card-category">Plain text tabs</p>
                            </div>
                            <div class="card-body">
                                <ul role="tablist" class="nav nav-tabs">
                                    <li role="presentation" class="nav-item show active">
                                        <a class="nav-link" id="info-tab" href="#agency" data-toggle="tab">Info</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="account-tab" href="#company" data-toggle="tab">Account</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="style-tab" href="#style" data-toggle="tab">Style</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="settings-tab" href="#settings" data-toggle="tab">Settings</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="agency" class="tab-pane fade show active" role="tabpanel" aria-labelledby="info-tab">
                                        Agency is a group of professional individuals looking to create amazing pieces of clothing. We have studied at the best schools of design, we have tailored the suits for the most stylish men in the industry, we are what you need!
                                    </div>
                                    <div id="company" class="tab-pane fade" role="tabpanel" aria-labelledby="account-tab">
                                        We are Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                                    </div>
                                    <div id="style" class="tab-pane fade" role="tabpanel" aria-labelledby="style-tab">
                                        Explore a wide variety of styles, personalise your finishes, and let us design the perfect home for you. It's what we do best and you can see proof in the products and reviews below.
                                    </div>
                                    <div id="settings" class="tab-pane fade" role="tabpanel" aria-labelledby="settings-tab">
                                        Explore a wide Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Tabs & Icons</h4>
                                <p class="card-category">Tabs with icons and full width</p>
                            </div>
                            <div class="card-body content-full-width">
                                <ul role="tablist" class="nav nav-tabs">
                                    <li role="presentation" class="nav-item show active">
                                        <a class="nav-link" id="info-tab" href="#icon-info" data-toggle="tab"><i class="fa fa-info"></i> Info</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="account-tab" href="#icon-account" data-toggle="tab"><i class="fa fa-user"></i> Account</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="style-tab" href="#icon-style" data-toggle="tab"><i class="fa fa-cube"></i> Style</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="settings-tab" href="#icon-settings" data-toggle="tab"><i class="fa fa-cog"></i> Settings</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div id="icon-info" class="tab-pane fade show active" role="tabpanel" aria-labelledby="info-tab">
                                        Agency is a group of professional individuals looking to create amazing pieces of clothing. We have studied at the best schools of design, we have tailored the suits for the most stylish men in the industry, we are what you need!
                                    </div>
                                    <div id="icon-account" class="tab-pane fade" role="tabpanel" aria-labelledby="account-tab">
                                        We are Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                                    </div>
                                    <div id="icon-style" class="tab-pane fade" role="tabpanel" aria-labelledby="style-tab">
                                        Explore a wide variety of styles, personalise your finishes, and let us design the perfect home for you. It's what we do best and you can see proof in the products and reviews below.
                                    </div>
                                    <div id="icon-settings" class="tab-pane fade" role="tabpanel" aria-labelledby="settings-tab">
                                        Explore a wide Houses Inc., a group of architects and interior designers based in Chicago and operating for clients worldwide. We’ve been designing stunningly beautiful houses and making clients happy for years.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto">
                        <h4 class="card-title text-center">Page Subcategories</h4>
                        <br />
                        <div class="nav-container">
                            <ul class="nav nav-icons justify-content-center" role="tablist">
                                <li class="nav-item show active">
                                    <a class="nav-link" id="description-tab" href="#description-logo" role="tab" data-toggle="tab">
                                        <i class="nc-icon nc-notes"></i>
                                        <br> Description
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="location-tab" href="#map-logo" role="tab" data-toggle="tab">
                                        <i class="nc-icon nc-pin-3"></i>
                                        <br> Location
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="legal-info-tab" href="#legal-logo" role="tab" data-toggle="tab">
                                        <i class="nc-icon nc-bank"></i>
                                        <br> Legal Info
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="help-tab" href="#help-logo" role="tab" data-toggle="tab">
                                        <i class="nc-icon nc-support-17"></i>
                                        <br> Help Center
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="description-logo" aria-labelledby="info-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Description about product</h4>
                                        <p class="card-category">More information here</p>
                                    </div>
                                    <div class="card-body">
                                        <p>Larger, yet dramatically thinner. More powerful, but remarkably power efficient. With a smooth metal surface that seamlessly meets the new Retina HD display.</p>
                                        <p>The first thing you notice when you hold the phone is how great it feels in your hand. There are no distinct edges. No gaps. Just a smooth, seamless bond of metal and glass that feels like one continuous surface.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="map-logo" aria-labelledby="info-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Location of product</h4>
                                        <p class="category">Here is some text</p>
                                    </div>
                                    <div class="card-body">
                                        <p>Another Text. The first thing you notice when you hold the phone is how great it feels in your hand. The cover glass curves down around the sides to meet the anodized aluminum enclosure in a remarkable, simplified design.</p>
                                        <p>Larger, yet dramatically thinner.It’s one continuous form where hardware and software function in perfect unison, creating a new generation of phone that’s better by any measure.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="legal-logo" aria-labelledby="info-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Legal items</h4>
                                        <p class="category">More information here</p>
                                    </div>
                                    <div class="card-body">
                                        <p>The first thing you notice when you hold the phone is how great it feels in your hand. The cover glass curves down around the sides to meet the anodized aluminum enclosure in a remarkable, simplified design.</p>
                                        <p>Larger, yet dramatically thinner.It’s one continuous form where hardware and software function in perfect unison, creating a new generation of phone that’s better by any measure.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="help-logo" aria-labelledby="info-tab">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Help center</h4>
                                        <p class="category">More information here</p>
                                    </div>
                                    <div class="card-body">
                                        <p>From the seamless transition of glass and metal to the streamlined profile, every detail was carefully considered to enhance your experience. So while its display is larger, the phone feels just right.</p>
                                        <p>Another Text. The first thing you notice when you hold the phone is how great it feels in your hand. The cover glass curves down around the sides to meet the anodized aluminum enclosure in a remarkable, simplified design.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end tab card-body -->
                    </div>
                    <!-- end col-md-8 -->
                </div>
                <!-- end row -->
            </div>
        </div>
    </div>
@endsection