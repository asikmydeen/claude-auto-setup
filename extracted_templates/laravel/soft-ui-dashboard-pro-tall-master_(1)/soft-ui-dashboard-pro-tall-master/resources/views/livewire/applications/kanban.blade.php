<div>
    <div class="flex m-4">
        <div class="flex ml-auto">
            <div class="relative pr-6 mt-1">
                <p class="mb-2 font-semibold leading-tight text-size-xs text-slate-400">Team members:</p>
                <div class="flex items-center justify-center">
                    <div>
                        <a href="javascript:;"
                            class="relative z-20 inline-flex items-center justify-center text-white transition-all duration-200 border-2 border-white border-solid w-9 h-9 ease-soft-in-out text-size-sm rounded-circle hover:z-30">
                            <img class="w-full rounded-circle" alt="Image placeholder"
                                src="../../assets/img/team-1.jpg" />
                        </a>
                        <a href="javascript:;"
                            class="relative z-20 inline-flex items-center justify-center -ml-4 text-white transition-all duration-200 border-2 border-white border-solid w-9 h-9 ease-soft-in-out text-size-sm rounded-circle hover:z-30">
                            <img class="w-full rounded-circle" alt="Image placeholder"
                                src="../../assets/img/team-2.jpg" />
                        </a>
                        <a href="javascript:;"
                            class="relative z-20 inline-flex items-center justify-center -ml-4 text-white transition-all duration-200 border-2 border-white border-solid w-9 h-9 ease-soft-in-out text-size-sm rounded-circle hover:z-30">
                            <img class="w-full rounded-circle" alt="Image placeholder"
                                src="../../assets/img/team-3.jpg" />
                        </a>
                        <a href="javascript:;"
                            class="relative z-20 inline-flex items-center justify-center -ml-4 text-white transition-all duration-200 border-2 border-white border-solid w-9 h-9 ease-soft-in-out text-size-sm rounded-circle hover:z-30">
                            <img class="w-full rounded-circle" alt="Image placeholder"
                                src="../../assets/img/team-4.jpg" />
                        </a>
                        <a href="javascript:;"
                            class="relative z-20 inline-flex items-center justify-center -ml-4 text-white transition-all duration-200 border-2 border-white border-solid w-9 h-9 ease-soft-in-out text-size-sm rounded-circle hover:z-30">
                            <img class="w-full rounded-circle" alt="Image placeholder"
                                src="../../assets/img/team-5.jpg" />
                        </a>
                    </div>
                </div>
                <hr class="absolute top-0 right-0 w-px h-full mt-0 bg-transparent bg-gradient-vertical-dark">
            </div>
            <div class="pl-6">
                <button type="button" data-target="#new-board-modal" data-toggle="modal"
                    class="mt-4 inline-block w-9 h-9 p-2.8 mb-0 font-bold text-center uppercase align-middle transition-all border-0 rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 active:opacity-85 bg-gradient-cyan text-white">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="box-border relative w-auto mt-4 overflow-scroll">
        <div class="box-border inline-flex min-h-screen py-2" style="overflow-x: auto">
            <div id="myKanban"></div>
        </div>
    </div>

    <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear opacity-0 outline-0 z-sticky"
        aria-hidden="true" id="new-board-modal" role="dialog">
        <div
            class="relative w-auto my-7 pointer-events-none sm:max-w-125 sm:mx-auto transition-transform duration-300  ease-soft-out -translate-y-13">
            <div
                class="relative flex flex-col w-full bg-white border border-solid pointer-events-auto bg-clip-padding border-black/20 rounded-xl outline-0">
                <div
                    class="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl ">
                    <h5 class="mb-0">Choose your new Board Name</h5>
                    <button type="button" data-target="#new-board-modal" data-toggle="modal"
                        class="flex items-center box-content w-4-em h-4-em text-slate-700 bg-transparent border-0 rounded-1.5 opacity-50 cursor-pointer p-2 -m-2 ml-auto"
                        data-target="#new-board-modal" aria-label="Close">
                        <span aria-hidden="true">
                            <i class="fa fa-close"></i>
                        </span>
                    </button>
                </div>
                <div class="relative flex-auto p-4 pt-6">
                    <div class="relative flex flex-wrap items-stretch w-full mb-6 transition-all rounded-lg ease-soft">
                        <span
                            class="text-size-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                            <i class="far fa-edit"></i>
                        </span>
                        <input type="text"
                            class="pl-9 text-size-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            placeholder="Board Name" id="jkanban-new-board-name" />
                    </div>
                    <div class="text-right">
                        <button
                            class="inline-block px-6 py-3 m-1 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-fuchsia-500"
                            id="jkanban-add-new-board" data-toggle="modal" data-target="#new-board-modal">
                            Save changes
                        </button>
                        <button data-target="#new-board-modal" data-toggle="modal"
                            class="inline-block px-6 py-3 m-1 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-slate-400"
                            data-dismiss="modal" data-target="#new-board-modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 z-40 hidden bg-black opacity-50" id="new-board-modal-backdrop"></div>

    <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear opacity-0 outline-0 z-sticky"
        id="jkanban-info-modal" aria-hidden="true" tabindex="-1" role="dialog">
        <div
            class="relative w-auto my-7 pointer-events-none sm:max-w-125 sm:mx-auto transition-transform duration-300  ease-soft-out -translate-y-13">
            <div
                class="relative flex flex-col w-full bg-white border border-solid pointer-events-auto bg-clip-padding border-black/20 rounded-xl outline-0">
                <div
                    class="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl">
                    <h5 class="mb-0">Task details</h5>
                    <button type="button" data-target="#jkanban-info-modal" data-toggle="modal"
                        class="flex items-center box-content w-4-em h-4-em text-slate-700 bg-transparent border-0 rounded-1.5 opacity-50 cursor-pointer p-2 -m-2 ml-auto"
                        aria-label="Close">
                        <span aria-hidden="true">
                            <i class="fa fa-close"></i>
                        </span>
                    </button>
                </div>
                <div class="relative flex-auto p-4 pt-6">
                    <input id="jkanban-task-id" class="hidden" />
                    <div class="relative flex flex-wrap items-stretch w-full mb-6 transition-all rounded-lg ease-soft">
                        <span
                            class="text-size-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                            <i class="far fa-edit"></i>
                        </span>
                        <input
                            class="pl-9 text-size-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            placeholder="Task Title" type="text" id="jkanban-task-title" />
                    </div>
                    <div class="relative flex flex-wrap items-stretch w-full mb-6 transition-all rounded-lg ease-soft">
                        <span
                            class="text-size-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                            <i class="fas fa-user"></i>
                        </span>
                        <input
                            class="pl-9 text-size-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                            placeholder="Task Assignee" type="text" id="jkanban-task-assignee" />
                    </div>
                    <div class="mb-4">
                        <textarea
                            class="-ml-px relative flex-auto w-full min-w-0 focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                            placeholder="Task Description" id="jkanban-task-description" rows="4"></textarea>
                    </div>
                    <div
                        class="relative hidden p-4 mb-4 text-white border border-solid rounded-lg border-lime-300 bg-gradient-lime">
                        Changes saved!</div>
                    <div class="text-right">
                        <button
                            class="inline-block px-6 py-3 m-1 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-fuchsia-500"
                            id="jkanban-update-task" data-toggle="modal" data-target="#jkanban-info-modal">
                            Save changes
                        </button>
                        <button data-target="#jkanban-info-modal" data-toggle="modal"
                            class="inline-block px-6 py-3 m-1 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 border-transparent border-solid rounded-lg cursor-pointer leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-slate-400"
                            data-dismiss="modal" data-target="#jkanban-info-modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed inset-0 z-40 hidden bg-black opacity-50" id="jkanban-info-modal-backdrop"></div>
</div>

@push('js')
<script src="{{ asset('assets') }}/js/plugins/jkanban.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/dragula.min.js"></script>
@endpush