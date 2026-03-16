<div class="flex flex-wrap -mx-3">
    <div class="w-full max-w-full px-3 mx-auto flex-0 lg:w-9/12">
        <div
            class="relative flex flex-col flex-auto min-w-0 p-4 mt-6 break-words bg-white border-0 dark:bg-gray-950 dark:shadow-soft-dark-xl shadow-soft-xl rounded-2xl bg-clip-border">
            <h6 class="mb-0 dark:text-white">New Project</h6>
            <p class="mb-0 leading-normal text-size-sm">Create new project</p>
            <hr
                class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-horizontal-dark dark:bg-gradient-horizontal-light" />
            <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                for="projectName">Project Name</label>
            <input type="text" name="projectName" placeholder=""
                class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
            <div class="flex flex-wrap mt-6 -mx-3">
                <div class="w-full max-w-full px-3 flex-0 md:w-6/12">
                    <div class="mb-4">
                        <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                            for="privateProject">Private Project</label>
                        <p class="mt-1 ml-1 leading-tight text-size-xs text-slate-500 dark:text-white/60">If you
                            are available for hire outside of the current situation, you can encourage others to
                            hire you.</p>
                        <div class="min-h-6 ml-1 mb-0.5 block pl-12">
                            <input type="checkbox" data-type="orange"
                                data-content="Once a project is made private, you cannot revert it to a public project."
                                data-title="Warning" data-icon="ni ni-bell-55" notification onclick="notify(this)"
                                class="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.3 h-5-em mt-0.5-em relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" />
                        </div>
                    </div>
                </div>
            </div>
            <label class="inline-block mt-6 mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                for="Project Description">Project Description</label>
            <p class="mt-1 ml-1 leading-tight text-size-xs text-slate-500 dark:text-white/60">This is how others
                will learn about the project, so make it good!</p>
            <div editor-quill id="editor">
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br /></p>
            </div>
            <label class="inline-block mt-6 mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                for="Project Description">Project Tags</label>
            <input choice name="choices-multiple-remove-button" id="choices-multiple-remove-button" type="text"
                value="Choice 1, Label Two" placeholder="Enter something" />
            <div class="flex flex-wrap -mx-3">
                <div class="w-6/12 max-w-full px-3 flex-0">
                    <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                        for="Start Date">Start Date</label>
                    <input datetimepicker
                        class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                        type="text" placeholder="Please select start date" data-input />
                </div>
                <div class="w-6/12 max-w-full px-3 flex-0">
                    <label class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                        for="End Date">End Date</label>
                    <input datetimepicker
                        class="focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                        type="text" placeholder="Please select end date" data-input />
                </div>
            </div>
            <label class="inline-block mt-6 mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80"
                for="Starting Files">Starting Files</label>
            <form dropzone action="/file-upload"
                class="dropzone focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-border px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                id="dropzone">
                <div class="fallback">
                    <input name="file" type="file" multiple />
                </div>
            </form>
            <div class="flex justify-end mt-6">
                <button type="button"
                    class="inline-block px-6 py-3 m-0 font-bold text-center uppercase align-middle transition-all bg-gray-200 border-0 rounded-lg cursor-pointer hover:scale-102 active:opacity-85 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 text-slate-800">Cancel</button>
                <button type="button"
                    class="inline-block px-6 py-3 m-0 ml-2 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-fuchsia shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85">Create
                    Project</button>
            </div>
        </div>
    </div>
</div>

@push('js')
<script src="{{ asset('assets') }}/js/plugins/quill.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/choices.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/flatpickr.min.js"></script>
<script src="{{ asset('assets') }}/js/plugins/dropzone.min.js"></script>
@endpush