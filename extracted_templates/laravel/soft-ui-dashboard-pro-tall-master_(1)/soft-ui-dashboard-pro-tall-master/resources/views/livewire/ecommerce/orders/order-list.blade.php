<div>
    <div class="justify-between sm:flex">
        <div>
            <a href="javascript:;"
                class="inline-block px-6 py-3 mb-4 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-fuchsia leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">New
                Order</a>
        </div>
        <div class="flex">
            <div class="relative inline">
                <a href="javascript:;" dropdown-trigger
                    class="inline-block px-6 py-3 mb-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer select-auto hover:scale-102 leading-pro text-size-xs ease-soft-in tracking-tight-soft active:opacity-85 active:shadow-soft-xs border-slate-700 text-slate-700 hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white"
                    aria-expanded="false">
                    Filters
                </a>
                <ul dropdown-menu
                    class="z-100 min-w-44 text-size-sm shadow-soft-3xl duration-250 transform-dropdown before:duration-350 before:font-awesome before:ease-soft before:text-5.5 dark:bg-gray-950 pointer-events-none absolute top-1.5 right-2 left-auto m-0 mt-2 block origin-top cursor-pointer list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all will-change-transform before:absolute before:top-0 before:right-5 before:left-auto before:z-40 before:text-white before:transition-all before:content-['\f0d8'] sm:-mr-6">
                    <li class="relative"><a
                            class="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-slate-500 transition-colors hover:bg-gray-200 hover:text-slate-700 focus:bg-gray-200 focus:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:duration-300"
                            href="javascript:;">Status: Paid</a></li>
                    <li class="relative"><a
                            class="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-slate-500 transition-colors hover:bg-gray-200 hover:text-slate-700 focus:bg-gray-200 focus:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:duration-300"
                            href="javascript:;">Status: Refunded</a></li>
                    <li class="relative"><a
                            class="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-slate-500 transition-colors hover:bg-gray-200 hover:text-slate-700 focus:bg-gray-200 focus:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:duration-300"
                            href="javascript:;">Status: Canceled</a></li>
                    <li class="relative">
                        <hr class="h-px my-2 bg-gradient-horizontal-dark" />
                    </li>
                    <li class="relative"><a
                            class="py-1.2 text-danger lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg px-4 font-normal text-red-600 transition-colors hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-200/80 lg:duration-300"
                            href="javascript:;">Remove Filter</a></li>
                </ul>
            </div>
            <button data-type="csv" type="button" export-button-list
                class="inline-block px-6 py-3 mb-4 ml-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-size-xs ease-soft-in tracking-tight-soft active:opacity-85 active:shadow-soft-xs border-slate-700 text-slate-700 hover:border-slate-700 hover:bg-transparent hover:opacity-75 active:border-slate-700 active:bg-slate-700 active:text-white">
                <span>
                    <i class="ni ni-archive-2"></i>
                </span>
                <span>Export CSV</span>
            </button>
        </div>
    </div>
    <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 flex-0">
            <div
                class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="overflow-x-auto">
                    <table class="table table-flush" datatable id="datatable-search-list">
                        <thead class="thead-light">
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck1">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10421</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 10:20 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <img src="../../../assets/img/team-2.jpg"
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                            alt="user image">
                                        <span>Orlando Imieto</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">Nike Sport V2</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$140,20</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck2">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10422</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 10:53 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <img src="../../../assets/img/team-1.jpg"
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                            alt="user image">
                                        <span>Alice Murinho</span>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">Valvet T-shirt</span>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">$42,00</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck3">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10423</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 11:13 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 cursor-pointer items-center border border-solid border-slate-700 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all hover:bg-transparent hover:text-slate-700 hover:opacity-75 hover:shadow-none active:bg-slate-700 active:text-white hover:active:bg-transparent hover:active:text-slate-700 hover:active:opacity-75 hover:active:shadow-none mb-0 mr-2 flex align-center justify-center"><i
                                                class="fas fa-undo text-size-3xs" aria-hidden="true"></i></button>
                                        <span>Refunded</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-dark-gray">
                                            <span>M</span>
                                        </div>
                                        <span>Michael Mirra</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Leather Wallet
                                        <span class="text-secondary ms-2"> +1 more </span>
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$25,50</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck4">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10424</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 12:20 PM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <img src="../../../assets/img/team-3.jpg"
                                                class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                                alt="user image">
                                            <span>Andrew Nichel</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Bracelet Onu-Lino
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$19,40</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck5">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10425</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 1:40 PM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 cursor-pointer items-center border border-solid border-red-600 bg-transparent text-center align-middle font-bold text-red-600 shadow-none transition-all hover:bg-transparent hover:text-red-600 hover:opacity-75 hover:shadow-none active:bg-red-600 active:text-white hover:active:bg-transparent hover:active:text-red-600 hover:active:opacity-75 hover:active:shadow-none mb-0 mr-2 flex align-center justify-center"><i
                                                class="fas fa-times text-size-3xs" aria-hidden="true"></i></button>
                                        <span>Canceled</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <img src="../../../assets/img/team-4.jpg"
                                                class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                                alt="user image">
                                            <span>Sebastian Koga</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Phone Case Pink
                                        <span class="text-secondary ms-2"> x 2 </span>
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$44,90</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck6">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10426</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 2:19 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-fuchsia">
                                            <span>L</span>
                                        </div>
                                        <span>Laur Gilbert</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Backpack Niver
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$112,50</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck7">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10427</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">1 Nov, 3:42 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-dark-gray">
                                            <span>I</span>
                                        </div>
                                        <span>Iryna Innda</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Adidas Vio
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$200,00</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck8">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10428</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">2 Nov, 9:32 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-dark-gray">
                                            <span>A</span>
                                        </div>
                                        <span>Arrias Liunda</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Airpods 2 Gen
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$350,00</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck9">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10429</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">2 Nov, 10:14 AM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <img src="../../../assets/img/team-5.jpg"
                                                class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                                alt="user image">
                                            <span>Rugna Ilpio</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Bracelet Warret
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$15,00</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck10">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10430</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">2 Nov, 12:56 PM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 cursor-pointer items-center border border-solid border-slate-700 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all hover:bg-transparent hover:text-slate-700 hover:opacity-75 hover:shadow-none active:bg-slate-700 active:text-white hover:active:bg-transparent hover:active:text-slate-700 hover:active:opacity-75 hover:active:shadow-none mb-0 mr-2 flex align-center justify-center"><i
                                                class="fas fa-undo text-size-3xs" aria-hidden="true"></i></button>
                                        <span>Refunded</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div class="flex items-center">
                                            <img src="../../../assets/img/ivana-squares.jpg"
                                                class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl"
                                                alt="user image">
                                            <span>Anna Landa</span>
                                        </div>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Watter Bottle India
                                        <span class="text-secondary ms-2"> x 3 </span>
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$25,00</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck11">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10431</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">2 Nov, 3:12 PM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-dark-gray">
                                            <span>K</span>
                                        </div>
                                        <span>Karl Innas</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Kitchen Gadgets
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$164,90</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="min-h-6 pl-7-em mb-0.5 block">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck12">
                                        </div>
                                        <p class="mb-0 ml-2 font-semibold leading-tight text-size-xs">#10432</p>
                                    </div>
                                </td>
                                <td class="font-semibold">
                                    <span class="my-2 leading-tight text-size-xs">2 Nov, 5:12 PM</span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <button
                                            class="active:shadow-soft-xs active:opacity-85 ease-soft-in leading-pro text-size-xs bg-150 bg-x-25 rounded-3.5xl p-1.2 h-6 w-6 mb-0 cursor-pointer border border-solid border-lime-500 bg-transparent text-center align-middle font-bold text-lime-500 shadow-none transition-all hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-black hover:active:bg-transparent hover:active:text-lime-500 hover:active:opacity-75 hover:active:shadow-none mr-2 flex items-center justify-center"><i
                                                class="text-size-3xs fas fa-check" aria-hidden="true"></i></button>
                                        <span>Paid</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <div class="flex items-center">
                                        <div
                                            class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white transition-all duration-200 text-size-xs ease-soft-in-out rounded-xl bg-gradient-cyan">
                                            <span>O</span>
                                        </div>
                                        <span>Oana Kilas</span>
                                    </div>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">
                                        Office Papers
                                    </span>
                                </td>
                                <td class="font-semibold leading-tight text-size-xs">
                                    <span class="my-2 leading-tight text-size-xs">$23,90</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</div>

@push('js')
<script src="{{ asset('assets') }}/js/plugins/datatables.min.js"></script>
@endpush