<div class="flex flex-wrap -mx-3">
    <div class="w-full max-w-full px-3 flex-0">
        <div
            class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
            <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <div class="lg:flex">
                    <div>
                        <h5 class="mb-0 dark:text-white">All Products</h5>
                        <p class="mb-0 leading-normal text-size-sm"> A lightweight, extendable, dependency-free
                            javascript HTML table plugin. </p>
                    </div>
                    <div class="my-auto mt-6 ml-auto lg:mt-0">
                        <div class="my-auto ml-auto">
                            <button type="button"
                                class="inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">+&nbsp;
                                New Product</button>
                            <button type="button" data-toggle="modal" data-target="#import"
                                class="inline-block px-8 py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 leading-pro text-size-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-fuchsia-500 text-fuchsia-500 hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:scale-100 active:border-fuchsia-500 active:bg-fuchsia-500 active:text-white hover:active:border-fuchsia-500 hover:active:bg-transparent hover:active:text-fuchsia-500 hover:active:opacity-75">Import</button>

                            <!-- modal  -->
                            <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto transition-opacity ease-linear opacity-0 z-sticky outline-0"
                                id="import" aria-hidden="true">
                                <div
                                    class="relative w-auto m-2 sm:m-7 pointer-events-none sm:max-w-125 sm:mx-auto lg:mt-48 transition-transform duration-300 ease-soft-out -translate-y-13">
                                    <div
                                        class="relative flex flex-col w-full bg-white border border-solid pointer-events-auto dark:bg-gray-950 bg-clip-padding border-black/20 rounded-xl outline-0">
                                        <div
                                            class="flex items-center justify-between p-4 border-b border-solid shrink-0 border-slate-100 rounded-t-xl">
                                            <h5 class="mb-0 leading-normal dark:text-white" id="ModalLabel">
                                                Import CSV</h5>
                                            <i class="ml-4 fas fa-upload"></i>
                                            <button type="button" data-toggle="modal" data-target="#import"
                                                class="fa fa-close w-4-em h-4-em ml-auto box-content p-2 text-black dark:text-white border-0 rounded-1.5 opacity-50 cursor-pointer -m-2 "
                                                data-dismiss="modal"></button>
                                        </div>
                                        <div class="relative flex-auto p-4">
                                            <p>You can browse your computer for a file.</p>
                                            <input type="text" placeholder="Browse file..."
                                                class="dark:bg-gray-950 mb-4 focus:shadow-soft-primary-outline dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none">
                                            <div class="min-h-6 pl-7-em mb-0.5 block">
                                                <input id="terms"
                                                    class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                    type="checkbox" value="" required />
                                                <label
                                                    class="relative float-left mt-0.75 ml-1 font-normal text-left cursor-pointer select-none text-size-sm text-slate-700"
                                                    for="terms"> I agree to the <a href="javascript:;"
                                                        class="font-bold text-slate-700">Terms and
                                                        Conditions</a> </label>
                                            </div>
                                        </div>
                                        <div
                                            class="flex flex-wrap items-center justify-end p-3 border-t border-solid shrink-0 border-slate-100 rounded-b-xl">
                                            <button type="button" data-toggle="modal" data-target="#import"
                                                class="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-slate shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Close</button>
                                            <button type="button"
                                                class="inline-block px-8 py-2 m-1 mb-4 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Upload</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button export-button-products data-type="csv"
                                class="inline-block px-8 py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 leading-pro text-size-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-fuchsia-500 text-fuchsia-500 hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:scale-100 active:border-fuchsia-500 active:bg-fuchsia-500 active:text-white hover:active:border-fuchsia-500 hover:active:bg-transparent hover:active:text-fuchsia-500 hover:active:opacity-75">Export</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto p-6 px-0 pb-0">
                <div class="overflow-x-auto table-responsive">
                    <table class="table" datatable id="products-list">
                        <thead class="thead-light">
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck1" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/adidas-hoodie.jpg"
                                            alt="hoodie">
                                        <h6 class="my-auto ml-4 dark:text-white">BKLGO Full Zip Hoodie</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Clothing</td>
                                <td class="leading-normal text-size-sm">$1,321</td>
                                <td class="leading-normal text-size-sm">243598234</td>
                                <td class="leading-normal text-size-sm">0</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-700 bg-red-200">Out
                                        of Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck2" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/macbook-pro.jpg"
                                            alt="mac">
                                        <h6 class="my-auto ml-4 dark:text-white">MacBook Pro</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Electronics</td>
                                <td class="leading-normal text-size-sm">$1,869</td>
                                <td class="leading-normal text-size-sm">877712</td>
                                <td class="leading-normal text-size-sm">0</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-700 bg-red-200">Out
                                        of Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck3">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/metro-chair.jpg"
                                            alt="metro-chair">
                                        <h6 class="my-auto ml-4 dark:text-white">Metro Bar Stool</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Furniture</td>
                                <td class="leading-normal text-size-sm">$99</td>
                                <td class="leading-normal text-size-sm">0134729</td>
                                <td class="leading-normal text-size-sm">978</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck10">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/alchimia-chair.jpg"
                                            alt="alchimia">
                                        <h6 class="my-auto ml-4 dark:text-white">Alchimia Chair</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Furniture</td>
                                <td class="leading-normal text-size-sm">$2,999</td>
                                <td class="leading-normal text-size-sm">113213</td>
                                <td class="leading-normal text-size-sm">0</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-700 bg-red-200">Out
                                        of Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck5">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/fendi-coat.jpg"
                                            alt="fendi">
                                        <h6 class="my-auto ml-4 dark:text-white">Fendi Gradient Coat</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Clothing</td>
                                <td class="leading-normal text-size-sm">$869</td>
                                <td class="leading-normal text-size-sm">634729</td>
                                <td class="leading-normal text-size-sm">725</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck6">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/off-white-jacket.jpg"
                                            alt="off_white">
                                        <h6 class="my-auto ml-4 dark:text-white">Off White Cotton Bomber</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Clothing</td>
                                <td class="leading-normal text-size-sm">$1,869</td>
                                <td class="leading-normal text-size-sm">634729</td>
                                <td class="leading-normal text-size-sm">725</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck7" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yohji-yamamoto.jpg"
                                            alt="yohji">
                                        <h6 class="my-auto ml-4 dark:text-white">Y-3 Yohji Yamamoto</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Shoes</td>
                                <td class="leading-normal text-size-sm">$869</td>
                                <td class="leading-normal text-size-sm">634729</td>
                                <td class="leading-normal text-size-sm">725</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">In
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck9" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/mcqueen-shirt.jpg"
                                            alt="mcqueen">
                                        <h6 class="my-auto ml-4 dark:text-white">Alexander McQueen</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Clothing</td>
                                <td class="leading-normal text-size-sm">$1,199</td>
                                <td class="leading-normal text-size-sm">00121399</td>
                                <td class="leading-normal text-size-sm">51293</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck11" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg"
                                            alt="coco">
                                        <h6 class="my-auto ml-4 dark:text-white">Luin Floor Lamp</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Furniture</td>
                                <td class="leading-normal text-size-sm">$1,900</td>
                                <td class="leading-normal text-size-sm">434729</td>
                                <td class="leading-normal text-size-sm">1100191321</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">In
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck12">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/heron-tshirt.jpg"
                                            alt="heron">
                                        <h6 class="my-auto ml-4 dark:text-white">Heron Preston T-shirt</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Clothing</td>
                                <td class="leading-normal text-size-sm">$149</td>
                                <td class="leading-normal text-size-sm">928341</td>
                                <td class="leading-normal text-size-sm">0</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-700 bg-red-200">Out
                                        of Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck13" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/living-chair.jpg"
                                            alt="coco">
                                        <h6 class="my-auto ml-4 dark:text-white">Gray Living Chair</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Furniture</td>
                                <td class="leading-normal text-size-sm">$2,099</td>
                                <td class="leading-normal text-size-sm">9912834</td>
                                <td class="leading-normal text-size-sm">32</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck4">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/orange-sofa.jpg"
                                            alt="yohji">
                                        <h6 class="my-auto ml-4 dark:text-white">Derbyshire Orange Sofa</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Furniture</td>
                                <td class="leading-normal text-size-sm">$2,999</td>
                                <td class="leading-normal text-size-sm">561151</td>
                                <td class="leading-normal text-size-sm">22</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck8" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/burberry.jpg"
                                            alt="undercover">
                                        <h6 class="my-auto ml-4 dark:text-white">Burberry Low-Tops</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Shoes</td>
                                <td class="leading-normal text-size-sm">$869</td>
                                <td class="leading-normal text-size-sm">634729</td>
                                <td class="leading-normal text-size-sm">725</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck22">
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/d&g-skirt.jpg"
                                            alt="D&G">
                                        <h6 class="my-auto ml-4 dark:text-white">Dolce & Gabbana Skirt</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Designer</td>
                                <td class="leading-normal text-size-sm">$999</td>
                                <td class="leading-normal text-size-sm">01827391</td>
                                <td class="leading-normal text-size-sm">0</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-red-700 bg-red-200">Out
                                        of Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="flex">
                                        <div class="my-auto block min-h-6 pl-7-em">
                                            <input
                                                class="w-5-em h-5-em ease-soft -ml-7-em rounded-1.4 checked:bg-gradient-dark-gray after:text-size-fa-check after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                type="checkbox" id="customCheck23" checked>
                                        </div>
                                        <img class="ml-4 w-1/10"
                                            src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/undercover.jpg"
                                            alt="undercover">
                                        <h6 class="my-auto ml-4 dark:text-white">Undercover T-shirt</h6>
                                    </div>
                                </td>
                                <td class="leading-normal text-size-sm">Shoes</td>
                                <td class="leading-normal text-size-sm">$869</td>
                                <td class="leading-normal text-size-sm">634729</td>
                                <td class="leading-normal text-size-sm">725</td>
                                <td>
                                    <span
                                        class="py-1.8-em px-3-em text-size-xxs-em rounded-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-lime-600 bg-lime-200">in
                                        Stock</span>
                                </td>
                                <td class="leading-normal text-size-sm">
                                    <a href="javascript:;">
                                        <i class="fas fa-eye text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;" class="mx-4">
                                        <i class="fas fa-user-edit text-slate-400 dark:text-white/70"></i>
                                    </a>
                                    <a href="javascript:;">
                                        <i class="fas fa-trash text-slate-400 dark:text-white/70"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@push('js')
<script src="{{ asset('assets') }}/js/plugins/datatables.min.js"></script>
@endpush