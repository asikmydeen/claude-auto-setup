<main class="mt-0 transition-all duration-200 ease-soft-in-out">
    <section>
        <div class="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
            <div class="container z-1">
                <div class="flex flex-wrap -mx-3">

                    <div
                        class="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">

                        <div
                            class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-gray-950 rounded-2xl bg-clip-border">
                            <div class="p-6 pb-0 mb-0">
                                <h4 class="font-bold">Sign In</h4>
                                <p class="mb-0">Enter your email and password to sign in</p>
                            </div>

                            <div class="flex-auto p-6">
                                <form role="form">
                                    <div class="mb-4">
                                        <input type="email" placeholder="Email"
                                            class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                    </div>
                                    <div class="mb-4">
                                        <input type="password" placeholder="Password"
                                            class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                    </div>
                                    <div class="min-h-6 mb-0.5 block pl-12 text-left">
                                        <input id="rememberMe"
                                            class="mt-0.5 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                            type="checkbox" />
                                        <label
                                            class="mb-2 ml-1 font-normal cursor-pointer select-none text-size-sm text-slate-700"
                                            for="rememberMe">Remember me</label>
                                    </div>
                                    <div class="text-center">
                                        <button type="button"
                                            class="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-fuchsia leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Sign
                                            In</button>
                                    </div>
                                </form>
                            </div>
                            <div
                                class="border-black/12.5 rounded-b-2xl border-t-0 border-solid p-6 text-center pt-0 px-1 sm:px-6">
                                <p class="mx-auto mb-4">Don't have an account? <a
                                        href="{{ route('basic-sign-up') }}"
                                        class="font-bold text-transparent bg-clip-text bg-gradient-fuchsia">Sign up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                        <div
                            class="relative flex flex-col justify-center h-full px-24 m-4 bg-gradient-fuchsia rounded-xl">
                            <img class="absolute left-0 opacity-40"
                                src="https://demos.creative-tim.com/soft-ui-dashboard-pro/assets/img/shapes/pattern-lines.svg"
                                alt="pattern-lines">
                            <div class="relative">
                                <img class="relative w-full max-w-125 z-2"
                                    src="https://demos.creative-tim.com/soft-ui-dashboard-pro/assets/img/illustrations/chat.png"
                                    alt="chat-img">
                            </div>
                            <h4 class="mt-12 font-bold text-white">"Attention is the new currency"</h4>
                            <p class="text-white ">The more effortless the writing looks, the more effort the writer
                                actually put into the proccess.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</main>