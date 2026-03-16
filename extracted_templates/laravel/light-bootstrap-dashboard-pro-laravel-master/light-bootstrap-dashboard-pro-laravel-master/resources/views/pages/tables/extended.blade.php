@extends('layouts.app', ['activePage' => 'extended', 'activeButton' => 'tables', 'title' => 'Light Bootstrap Dashboard PRO Laravel by Creative Tim & UPDIVISION', 'navName' => 'Extended Tables'])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card table-with-links">
                        <div class="card-header ">
                            <h4 class="card-title">Table with Links</h4>
                            <p class="card-category">Here is a subtitle for this table</p>
                        </div>
                        <div class="card-body table-full-width">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Name</th>
                                        <th>Job Position</th>
                                        <th class="text-right">Salary</th>
                                        <th class="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">1</td>
                                        <td>Andrew Mike</td>
                                        <td>Develop</td>
                                        <td class="text-right">&euro; 99,225</td>
                                        <td class="td-actions text-right">
                                            <a href="#" rel="tooltip" title="View Profile" class="btn btn-info btn-link btn-xs">
                                                <i class="fa fa-user"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Edit Profile" class="btn btn-success btn-link btn-xs">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-xs">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">2</td>
                                        <td>John Doe</td>
                                        <td>Design</td>
                                        <td class="text-right">&euro; 89,241</td>
                                        <td class="td-actions text-right">
                                            <a href="#" rel="tooltip" title="View Profile" class="btn btn-info btn-link btn-xs">
                                                <i class="fa fa-user"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Edit Profile" class="btn btn-success btn-link btn-xs">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-xs">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">3</td>
                                        <td>Alex Mike</td>
                                        <td>Design</td>
                                        <td class="text-right">&euro; 92,144</td>
                                        <td class="td-actions text-right">
                                            <a href="#" rel="tooltip" title="View Profile" class="btn btn-info btn-link btn-xs">
                                                <i class="fa fa-user"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Edit Profile" class="btn btn-success btn-link btn-xs">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-xs">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">4</td>
                                        <td>Mike Monday</td>
                                        <td>Marketing</td>
                                        <td class="text-right">&euro; 49,990</td>
                                        <td class="td-actions text-right">
                                            <a href="#" rel="tooltip" title="View Profile" class="btn btn-info btn-link btn-xs">
                                                <i class="fa fa-user"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Edit Profile" class="btn btn-success btn-link btn-xs">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-xs">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">5</td>
                                        <td>Paul Dickens</td>
                                        <td>Communication</td>
                                        <td class="text-right">&euro; 69,201</td>
                                        <td class="td-actions text-right">
                                            <a href="#" rel="tooltip" title="View Profile" class="btn btn-info btn-link btn-xs">
                                                <i class="fa fa-user"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Edit Profile" class="btn btn-success btn-link btn-xs">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                            <a href="#" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-xs">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card table-with-switches">
                        <div class="card-header ">
                            <h4 class="card-title">Table with Switches</h4>
                        </div>
                        <div class="card-body table-full-width">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Name</th>
                                        <th>Job Position</th>
                                        <th class="text-right">Salary</th>
                                        <th class="text-right">Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">1</td>
                                        <td>Andrew Mike</td>
                                        <td>Develop</td>
                                        <td class="text-right">&euro; 99,225</td>
                                        <td class="text-right">
                                            <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">2</td>
                                        <td>John Doe</td>
                                        <td>Design</td>
                                        <td class="text-right">&euro; 89,241</td>
                                        <td class="text-right">
                                            <input type="checkbox" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">3</td>
                                        <td>Alex Mike</td>
                                        <td>Design</td>
                                        <td class="text-right">&euro; 92,144</td>
                                        <td class="text-right">
                                            <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">4</td>
                                        <td>Mike Monday</td>
                                        <td>Marketing</td>
                                        <td class="text-right">&euro; 49,990</td>
                                        <td class="text-right">
                                            <input type="checkbox" data-toggle="switch" data-on-color="info" data-off-color="info" data-on-text="" data-off-text="">
                                            <span class="toggle"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card table-big-boy">
                        <div class="card-header ">
                            <h4 class="card-title">Table Big Boy</h4>
                            <p class="card-category">A table for content management</p>
                            <br />
                        </div>
                        <div class="card-body table-full-width">
                            <table class="table table-bigboy">
                                <thead>
                                    <tr>
                                        <th class="text-center">Thumb</th>
                                        <th>Blog Title</th>
                                        <th class="th-description">Description</th>
                                        <th class="text-right">Date</th>
                                        <th class="text-right">Views</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="img-container">
                                                <img src="{{asset('img/blog-1.jpg')}}" alt="...">
                                            </div>
                                        </td>
                                        <td class="td-name">
                                            10 Things that all designers do
                                        </td>
                                        <td>
                                            Most beautiful agenda for the office, really nice paper and black cover. Most beautiful agenda for the office.
                                        </td>
                                        <td class="td-number">30/08/2016</td>
                                        <td class="td-number">
                                            1,225
                                        </td>
                                        <td class="td-actions">
                                            <button type="button" rel="tooltip" data-placement="left" title="View Post" class="btn btn-info btn-link btn-icon">
                                                <i class="fa fa-image"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Edit Post" class="btn btn-success btn-link btn-icon">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Remove Post" class="btn btn-danger btn-link btn-icon ">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="img-container">
                                                <img src="{{asset('img/blog-2.jpg')}}" alt="...">
                                            </div>
                                        </td>
                                        <td class="td-name">
                                            Back to School Offer
                                        </td>
                                        <td>
                                            Design is not just what it looks like and feels like. Design is how it works.
                                        </td>
                                        <td class="td-number">17/07/2016</td>
                                        <td class="td-number">
                                            49,302
                                        </td>
                                        <td class="td-actions">
                                            <button type="button" rel="tooltip" data-placement="left" title="View Post" class="btn btn-info btn-link btn-icon">
                                                <i class="fa fa-image"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Edit Post" class="btn btn-success btn-link btn-icon">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Remove Post" class="btn btn-danger btn-link btn-icon ">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="img-container">
                                                <img src="{{asset('img/blog-3.jpg')}}" alt="...">
                                            </div>
                                        </td>
                                        <td class="td-name">
                                            First Dribbble Meetup in Romania
                                        </td>
                                        <td>
                                            A groundbreaking Retina display. All-flash architecture. Fourth-generation Intel processors.
                                        </td>
                                        <td class="td-number">23/06/2016</td>
                                        <td class="td-number">
                                            1,799
                                        </td>
                                        <td class="td-actions">
                                            <button type="button" rel="tooltip" data-placement="left" title="View Post" class="btn btn-info btn-link btn-icon">
                                                <i class="fa fa-image"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Edit Post" class="btn btn-success btn-link btn-icon">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Remove Post" class="btn btn-danger btn-link btn-icon ">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="img-container">
                                                <img src="{{asset('img/blog-4.jpg')}}" alt="...">
                                            </div>
                                        </td>
                                        <td class="td-name">
                                            How we created our startup with 0$
                                        </td>
                                        <td>
                                            A desk is a generally wooded piece of furniture and a type of useful table often used in a school or office setting for various academic or professional activities ...
                                        </td>
                                        <td class="td-number">30/06/2016</td>
                                        <td class="td-number">
                                            23,030
                                        </td>
                                        <td class="td-actions">
                                            <button type="button" rel="tooltip" data-placement="left" title="View Post" class="btn btn-info btn-link btn-icon">
                                                <i class="fa fa-image"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Edit Post" class="btn btn-success btn-link btn-icon">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Remove Post" class="btn btn-danger btn-link btn-icon ">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="img-container">
                                                <img src="{{asset('img/blog-1.jpg')}}" alt="...">
                                            </div>
                                        </td>
                                        <td class="td-name">
                                            To use or not to use Bootstrap
                                        </td>
                                        <td>
                                            The Office Chair adapts naturally to virtually every body and is a permanent fixture.
                                        </td>
                                        <td class="td-number">10/05/2016</td>
                                        <td class="td-number">
                                            13,763
                                        </td>
                                        <td class="td-actions">
                                            <button type="button" rel="tooltip" data-placement="left" title="View Post" class="btn btn-info btn-link btn-icon">
                                                <i class="fa fa-image"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Edit Post" class="btn btn-success btn-link btn-icon">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button type="button" rel="tooltip" data-placement="left" title="Remove Post" class="btn btn-danger btn-link btn-icon ">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection