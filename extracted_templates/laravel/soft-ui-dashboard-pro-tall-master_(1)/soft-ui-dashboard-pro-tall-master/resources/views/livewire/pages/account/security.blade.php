<div>
    <div class="flex flex-wrap items-center -mx-3">
        <div class="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-8/12 lg:w-4/12">
            <div class="relative right-0">
                <ul nav-pills
                    class="relative flex flex-wrap p-1 mb-0 list-none dark:shadow-soft-dark-xl dark:bg-gray-950 rounded-xl bg-gray-50"
                    role="tablist">
                    <li class="z-30 flex-auto text-center">
                        <a nav-link active
                            class="block w-full py-1 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit bg-none dark:text-white"
                            href="javascript:;" role="tab" aria-selected="true"> Messages </a>
                    </li>
                    <li class="z-30 flex-auto text-center">
                        <a nav-link
                            class="block w-full py-1 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit bg-none dark:text-white"
                            href="javascript:;" role="tab" aria-selected="false"> Social </a>
                    </li>
                    <li class="z-30 flex-auto text-center">
                        <a nav-link
                            class="block w-full py-1 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit bg-none dark:text-white"
                            href="javascript:;" role="tab" aria-selected="false"> Notifications </a>
                    </li>
                    <li class="z-30 flex-auto text-center">
                        <a nav-link
                            class="block w-full py-1 transition-colors border-0 rounded-lg ease-soft-in-out bg-inherit bg-none dark:text-white"
                            href="javascript:;" role="tab" aria-selected="false"> Backup </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="my-4">
        <div class="flex flex-wrap -mx-3">
            <div class="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12">
                <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                    for="gender">Security Question</label>
                <select choice name="choices-questions" id="choices-questions">
                    <option value="Question 1">Question 1</option>
                    <option value="Question 2">Question 2</option>
                    <option value="Question 3">Question 3</option>
                    <option value="Your Question" disabled>Your Question</option>
                </select>
            </div>
            <div class="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12">
                <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                    for="answer">Your Answer</label>
                <div class="mb-4">
                    <input type="text" name="answer" placeholder="Enter your answer"
                        class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                </div>
            </div>

            <hr
                class="w-full h-px mx-0 my-4 mt-1 bg-transparent border-0 opacity-25 bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />

            <div class="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12">
                <div
                    class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
                        <h6 class="mb-0 dark:text-white">Security Settings</h6>
                    </div>
                    <div class="flex-auto p-4">
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Notify me via email when logging in</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input checked
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Send SMS confirmation for all online
                                payments</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Check which devices accessed your account</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input checked
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Find My Device, make sure your device can be found
                                if it gets lost</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Lock your device with a PIN, pattern, or
                                password</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="leading-normal text-size-sm">Manage what apps have access to app-usage data on
                                your device</span>
                            <div class="min-h-6 mb-0.5 block pl-12">
                                <input checked
                                    class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" />
                            </div>
                        </div>
                        <div class="flex flex-wrap mt-12 -mx-3">
                            <div class="w-full max-w-full px-3 ml-auto text-right flex-0 lg:w-8/12">
                                <button
                                    class="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 leading-pro text-size-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-fuchsia-500 text-fuchsia-500 hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:scale-100 active:border-fuchsia-500 active:bg-fuchsia-500 active:text-white hover:active:border-fuchsia-500 active:hover:bg-transparent hover:active:text-fuchsia-500 hover:active:opacity-75">Cancel</button>
                                <button type="button"
                                    class="inline-block px-8 py-2 m-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Save
                                    changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full max-w-full px-3 mt-6 sm:flex-0 shrink-0 sm:w-6/12 md:mt-0">
                <div
                    class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
                        <div class="flex items-center">
                            <h6 class="mb-0 dark:text-white">Two factor authentication</h6>
                            <button type="button" href="javascript:;"
                                class="inline-block px-8 py-2 mb-0 ml-auto font-bold text-right text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Enable</button>
                        </div>
                    </div>
                    <div class="flex-auto p-4">
                        <p class="mt-4 mb-6 leading-normal text-size-sm text-slate-500 dark:text-white/60 sm:mt-12">
                            Two-factor authentication adds an additional layer of security to your account by requiring
                            more than just a password to log in.</p>
                        <div
                            class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                            <div class="flex-auto p-4 bg-gradient-dark-gray dark:bg-gradient-neutral rounded-xl">
                                <h6 class="mb-0 text-white">Questions about security?</h6>
                                <p class="mb-6 leading-normal text-white text-size-sm dark:text-white/60">Have a
                                    question, concern, or comment about security? Please contact us.</p>
                                <button type="button" href="javascript:;"
                                    class="inline-block px-6 py-3 mb-0 font-bold text-right uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs bg-gradient-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 text-slate-800">Contact
                                    Us</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap mt-6 -mx-3">
            <div class="w-full max-w-full px-3 md:flex-0 shrink-0 md:w-6/12">
                <div
                    class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
                        <h6 class="mb-1 dark:text-white">Change password</h6>
                        <p class="mb-0 leading-normal text-size-sm dark:text-white/60">We will send you an email with
                            the verification code.</p>
                    </div>
                    <div class="flex-auto p-4">
                        <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                            for="Current password">Current password</label>
                        <div class="mb-4">
                            <input type="password" name="Current password" placeholder="Current password"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                        </div>
                        <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                            for="New password">New password</label>
                        <div class="mb-4">
                            <input type="password" name="New password" placeholder="New password"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                        </div>
                        <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                            for="Confirm password">Confirm new password</label>
                        <div class="mb-4">
                            <input type="password" name="Confirm password" placeholder="Confirm password"
                                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                        </div>
                        <button type="button" href="javascript:;"
                            class="inline-block w-full px-6 py-3 mb-0 font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs dark:bg-gradient-neutral bg-gradient-dark-gray leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25">Update
                            Password</button>
                    </div>
                </div>
            </div>
            <div class="w-full max-w-full px-3 mt-6 md:flex-0 shrink-0 md:mt-0 md:w-6/12">
                <div
                    class="relative flex flex-col min-w-0 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
                    <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-4 pb-0">
                        <h6 class="mb-1 dark:text-white">Password requirements</h6>
                        <p class="mb-0 leading-normal text-size-sm dark:text-white/60">Please follow this guide for a
                            strong password:</p>
                    </div>

                    <div class="flex-auto p-4">
                        <ul class="float-left pl-6 mb-0 list-disc text-slate-500">
                            <li>
                                <span class="leading-normal text-size-sm">One special characters</span>
                            </li>
                            <li>
                                <span class="leading-normal text-size-sm">Min 6 characters</span>
                            </li>
                            <li>
                                <span class="leading-normal text-size-sm">One number (2 are recommended)</span>
                            </li>
                            <li>
                                <span class="leading-normal text-size-sm">Change it often</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

@push('js')
<script src="{{ asset('assets') }}/js/plugins/choices.min.js"></script>
@endpush