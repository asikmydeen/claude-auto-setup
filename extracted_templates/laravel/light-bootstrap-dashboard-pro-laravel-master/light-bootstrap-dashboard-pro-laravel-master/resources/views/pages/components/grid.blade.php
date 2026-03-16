@extends('layouts.app', ['activePage' => 'grid', 'activeButton' => 'components', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Grid' ])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="container-fluid">
                <h4 class="card-card-title">XS Grid
                    <small>Always Horizontal</small>
                </h4>
                <div class="row">
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-4</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">SM Grid
                    <small>Collapsed at 768px</small>
                </h4>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-4</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">MD Grid
                    <small>Collapsed at 992px</small>
                </h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-4</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">LG Grid
                    <small>Collapsed at 1200px</small>
                </h4>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-lg-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-lg-4</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-lg-4</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">Mixed Grid
                    <small>Showing different sizes on different screens</small>
                </h4>
                <div class="row">
                    <div class="col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-6 col-lg-3</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-6 col-lg-3</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-6 col-lg-3</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-sm-6 col-lg-3</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">Offset Grid
                    <small>Adding some space when needed</small>
                </h4>
                <div class="row">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-3</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 ml-auto">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-3 ml-auto</code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 mr-auto ml-auto">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-4 mr-auto ml-auto</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mr-auto ml-auto">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-4 mr-auto ml-auto</code>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mr-auto ml-auto">
                        <div class="card">
                            <div class="card-body text-center">
                                <code>col-md-6 mr-auto ml-auto</code>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="card-title">Paragraphs</h4>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <h3>Some card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                            </div>
                            <div class="col-sm-6">
                                <h3>Another card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.</p>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-4">
                                <h3>Some card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
                            </div>
                            <div class="col-sm-4">
                                <h3>Another card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
                            </div>
                            <div class="col-sm-4">
                                <h3>Another card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-4">
                                <h3>Some card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
                            </div>
                            <div class="col-sm-8">
                                <h3>Another card-title Here</h3>
                                <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--  end card -->
            </div>
        </div>
    </div>
@endsection