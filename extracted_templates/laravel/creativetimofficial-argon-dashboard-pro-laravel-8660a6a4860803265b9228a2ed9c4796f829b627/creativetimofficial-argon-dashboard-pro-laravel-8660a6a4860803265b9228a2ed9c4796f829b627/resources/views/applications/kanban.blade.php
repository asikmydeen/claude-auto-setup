@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
            @include('layouts.navbars.auth.topnav', ['title' => 'Kanban'])
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
        <div class="d-flex m-3">
            <div class="ms-auto d-flex">
                <div class="pe-4 mt-1 position-relative">
                    <p class="text-white text-xs font-weight-bold mb-2">Team members:</p>
                    <div class="d-flex align-items-center justify-content-center">
                        <div class="avatar-group">
                            <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                data-original-title="Jessica Rowland">
                                <img alt="Image placeholder" src="../../assets/img/team-1.jpg">
                            </a>
                            <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                data-original-title="Audrey Love">
                                <img alt="Image placeholder" src="../../assets/img/team-2.jpg" class="rounded-circle">
                            </a>
                            <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                data-original-title="Michael Lewis">
                                <img alt="Image placeholder" src="../../assets/img/team-3.jpg" class="rounded-circle">
                            </a>
                            <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                data-original-title="Lucia Linda">
                                <img alt="Image placeholder" src="../../assets/img/team-4.jpg" class="rounded-circle">
                            </a>
                            <a href="javascript:;" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                                data-original-title="Ronald Miller">
                                <img alt="Image placeholder" src="../../assets/img/team-5.jpg" class="rounded-circle">
                            </a>
                        </div>
                    </div>
                    <hr class="vertical light mt-0">
                </div>
                <div class="ps-4">
                    <button class="btn bg-gradient-info btn-icon-only mb-0 mt-3" data-toggle="modal"
                        data-target="#new-board-modal">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-3 kanban-container">
            <div class="py-2 min-vh-100 d-inline-flex" style="overflow-x: auto">
                <div id="myKanban"></div>
            </div>
        </div>
        <div class="modal fade" id="new-board-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="h5 modal-title">Choose your new Board Name</h5>
                        <button type="button" class="btn close pe-1" data-dismiss="modal" data-target="#new-board-modal"
                            aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="pt-4 modal-body">
                        <div class="mb-4 input-group">
                            <span class="input-group-text">
                                <i class="far fa-edit"></i>
                            </span>
                            <input class="form-control" placeholder="Board Name" type="text"
                                id="jkanban-new-board-name" />
                        </div>
                        <div class="text-end">
                            <button class="m-1 btn btn-primary" id="jkanban-add-new-board" data-toggle="modal"
                                data-target="#new-board-modal">
                                Save changes
                            </button>
                            <button class="m-1 btn btn-secondary" data-dismiss="modal" data-target="#new-board-modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden opacity-50 fixed inset-0 z-40 bg-black" id="new-board-modal-backdrop"></div>
        <div class="modal fade" id="jkanban-info-modal" style="display: none" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="h5 modal-title">Task details</h5>
                        <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="pt-4 modal-body">
                        <input id="jkanban-task-id" class="d-none" />
                        <div class="mb-4 input-group">
                            <span class="input-group-text">
                                <i class="far fa-edit"></i>
                            </span>
                            <input class="form-control" placeholder="Task Title" type="text" id="jkanban-task-title" />
                        </div>
                        <div class="mb-4 input-group">
                            <span class="input-group-text">
                                <i class="fas fa-user"></i>
                            </span>
                            <input class="form-control" placeholder="Task Assignee" type="text"
                                id="jkanban-task-assignee" />
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" placeholder="Task Description" id="jkanban-task-description" rows="4"></textarea>
                        </div>
                        <div class="alert alert-success d-none">Changes saved!</div>
                        <div class="text-end">
                            <button class="m-1 btn btn-primary" id="jkanban-update-task" data-toggle="modal"
                                data-target="#jkanban-info-modal">
                                Save changes
                            </button>
                            <button class="m-1 btn btn-secondary" data-dismiss="modal" data-target="#jkanban-info-modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden opacity-50 fixed inset-0 z-40 bg-black" id="jkanban-info-modal-backdrop"></div>
        @include('layouts.footers.auth.footer')
    </div>
@endsection

@push('js')
    <script src="/assets/js/plugins/jkanban/jkanban.js"></script>
    <script>
        // jkanban init

        (function() {
            if (document.getElementById("myKanban")) {
                var KanbanTest = new jKanban({
                    element: "#myKanban",
                    gutter: "10px",
                    widthBoard: "450px",
                    click: el => {
                        let jkanbanInfoModal = document.getElementById("jkanban-info-modal");

                        let jkanbanInfoModalTaskId = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-id"
                        );
                        let jkanbanInfoModalTaskTitle = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-title"
                        );
                        let jkanbanInfoModalTaskAssignee = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-assignee"
                        );
                        let jkanbanInfoModalTaskDescription = document.querySelector(
                            "#jkanban-info-modal #jkanban-task-description"
                        );
                        let taskId = el.getAttribute("data-eid");

                        let taskTitle = el.querySelector('p.text').innerHTML;
                        let taskAssignee = el.getAttribute("data-assignee");
                        let taskDescription = el.getAttribute("data-description");
                        jkanbanInfoModalTaskId.value = taskId;
                        jkanbanInfoModalTaskTitle.value = taskTitle;
                        jkanbanInfoModalTaskAssignee.value = taskAssignee;
                        jkanbanInfoModalTaskDescription.value = taskDescription;
                        var myModal = new bootstrap.Modal(jkanbanInfoModal, {
                            show: true
                        });
                        myModal.show();
                    },
                    buttonClick: function(el, boardId) {
                        if (
                            document.querySelector("[data-id='" + boardId + "'] .itemform") ===
                            null
                        ) {
                            // create a form to enter element
                            var formItem = document.createElement("form");
                            formItem.setAttribute("class", "itemform");
                            formItem.innerHTML = `<div class="form-group">
          <textarea class="form-control" rows="2" autofocus></textarea>
          </div>
          <div class="form-group">
              <button type="submit" class="btn bg-gradient-success btn-sm pull-end">Add</button>
              <button type="button" id="kanban-cancel-item" class="btn bg-gradient-light btn-sm pull-end me-2">Cancel</button>
          </div>`;

                            KanbanTest.addForm(boardId, formItem);
                            formItem.addEventListener("submit", function(e) {
                                e.preventDefault();
                                var text = e.target[0].value;
                                let newTaskId =
                                    "_" + text.toLowerCase().replace(/ /g, "_") + boardId;
                                KanbanTest.addElement(boardId, {
                                    id: newTaskId,
                                    title: text,
                                    class: ["border-radius-md"]
                                });
                                formItem.parentNode.removeChild(formItem);
                            });
                            document.getElementById("kanban-cancel-item").onclick = function() {
                                formItem.parentNode.removeChild(formItem);
                            };
                        }
                    },
                    addItemButton: true,
                    boards: [{
                            id: "_backlog",
                            title: "Backlog",
                            item: [{
                                    id: "_task_1_title_id",
                                    title: '<p class="text mb-0">Click me to change title</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_2_title_id",
                                    title: '<p class="text mb-0">Drag me to "In progress" section</p>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_do_something_id",
                                    title: '<img src="../../assets/img/office-dark.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-primary">Pending</span><p class="text mt-2">Website Design: New cards for blog section and profile details</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">3</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-1.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="../../assets/img/team-2.jpg" class="rounded-circle"></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="../../assets/img/team-3.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                },
                            ]
                        },
                        {
                            id: "_progress",
                            title: "In progress",
                            item: [{
                                    id: "_task_3_title_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-warning">Errors</span><p class="text mt-2">Fix Firefox errors</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">11</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="../../assets/img/team-3.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-2.jpg" class=""></a></div></div>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_4_title_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-info">Updates</span><p class="text mt-2">Argon Dashboard PRO - Angular 11</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">3</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="../../assets/img/team-5.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-4.jpg" class=""></a></div></div>',
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_do_something_4_id",
                                    title: '<img src="../../assets/img/meeting.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-info">Updates</span><p class="text mt-2">Vue 3 Updates</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">9</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-1.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="../../assets/img/team-2.jpg" class="rounded-circle"></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="../../assets/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                }
                            ]

                        },
                        {
                            id: "_working",
                            title: "In review",
                            item: [{
                                    id: "_task_do_something_2_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-warning">In Testing</span><p class="text mt-2">Responsive Changes</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">11</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="../../assets/img/team-3.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-2.jpg" class=""></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_run_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-success">In review</span><p class="text mt-2 mb-1">Change images dimension</p><div class="col"><div class="progress progressm mb-3 w5"><div class="progress-bar bg-gradient-success" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div></div></div><div class="d-flex"><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-3.jpg" class=""></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_do_something_3_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-info">In Review</span><p class="text mt-2 mb-1">Update Links</p><div class="col"><div class="progress progressm mb-3 w5"><div class="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div></div></div><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">6</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jana Lucie"><img alt="Image placeholder" src="../../assets/img/team-5.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Mike Alis"><img alt="Image placeholder" src="../../assets/img/team-1.jpg" class=""></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                }
                            ]
                        },
                        {
                            id: "_done",
                            title: "Done",
                            item: [{
                                    id: "_task_all_right_id",
                                    title: '<img src="../../assets/img/home-decor-1.jpg" class="w-100"><span class="mt-3 badge badge-sm bg-gradient-success">Done</span><p class="text mt-2">Redesign for the home page</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">8</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Jessica Rowland"><img alt="Image placeholder" src="../../assets/img/team-5.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs rounded-circle me-2" data-toggle="tooltip" data-original-title="Audrey Love"><img alt="Image placeholder" src="../../assets/img/team-1.jpg" class="rounded-circle"></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="../../assets/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                },
                                {
                                    id: "_task_ok_id",
                                    title: '<span class="mt-2 badge badge-sm bg-gradient-success">Done</span><p class="text mt-2">Schedule winter campaign</p><div class="d-flex"><div> <i class="fa fa-paperclip me-1 text-sm"></i><span class="text-sm">2</span></div><div class="avatar-group ms-auto"><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Laurence"><img alt="Image placeholder" src="../../assets/img/team-1.jpg" class=""></a><a href="javascript:;" class="avatar avatar-xs me-2 rounded-circle" data-toggle="tooltip" data-original-title="Michael Lewis"><img alt="Image placeholder" src="../../assets/img/team-4.jpg" class="rounded-circle"></a></div></div>',
                                    assignee: "Done Joe",
                                    description: "This task's description is for something, but not for anything",
                                    class: ["border-radius-md"]
                                }
                            ]
                        }
                    ]
                });

                var addBoardDefault = document.getElementById("jkanban-add-new-board");
                addBoardDefault.addEventListener("click", function() {
                    let newBoardName = document.getElementById("jkanban-new-board-name")
                        .value;
                    let newBoardId = "_" + newBoardName.toLowerCase().replace(/ /g, "_");
                    KanbanTest.addBoards([{
                        id: newBoardId,
                        title: newBoardName,
                        item: []
                    }]);
                    document.querySelector('#new-board-modal').classList.remove('show');
                    document.querySelector('body').classList.remove('modal-open');

                    document.querySelector('.modal-backdrop').remove();
                });

                var updateTask = document.getElementById("jkanban-update-task");
                updateTask.addEventListener("click", function() {
                    let jkanbanInfoModalTaskId = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-id"
                    );
                    let jkanbanInfoModalTaskTitle = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-title"
                    );
                    let jkanbanInfoModalTaskAssignee = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-assignee"
                    );
                    let jkanbanInfoModalTaskDescription = document.querySelector(
                        "#jkanban-info-modal #jkanban-task-description"
                    );
                    KanbanTest.replaceElement(jkanbanInfoModalTaskId.value, {
                        title: jkanbanInfoModalTaskTitle.value,
                        assignee: jkanbanInfoModalTaskAssignee.value,
                        description: jkanbanInfoModalTaskDescription.value
                    });
                    jkanbanInfoModalTaskId.value = jkanbanInfoModalTaskId.value;
                    jkanbanInfoModalTaskTitle.value = jkanbanInfoModalTaskTitle.value;
                    jkanbanInfoModalTaskAssignee.value = jkanbanInfoModalTaskAssignee.value;
                    jkanbanInfoModalTaskDescription.value = jkanbanInfoModalTaskDescription.value;
                    document.querySelector('#jkanban-info-modal').classList.remove('show');
                    document.querySelector('body').classList.remove('modal-open');
                    document.querySelector('.modal-backdrop').remove();


                });
            }
        })();
    </script>
@endpush
