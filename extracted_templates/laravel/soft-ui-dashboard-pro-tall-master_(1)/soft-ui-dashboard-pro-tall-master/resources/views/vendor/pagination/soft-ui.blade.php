@if ($paginator->hasPages())

<div class="dataTable-wrapper">
    <div class="dataTable-bottom">
        <div class="dataTable-info">
            {!! __('Showing') !!}
            @if ($paginator->firstItem())
                {{ $paginator->firstItem() }}
                {!! __('to') !!}
                {{ $paginator->lastItem() }}
            @else
                {{ $paginator->count() }}
            @endif
            {!! __('of') !!}
            {{ $paginator->total() }}
            {!! __('entries') !!}
        </div>

        <nav class="dataTable-pagination">
            <ul class="dataTable-pagination-list">
                <li class="pager">
                    @if ($paginator->onFirstPage())
                    {{-- <button aria-label="Previous" id="prev-disabled">
                        <a>
                            <
                        </a>
                    </button> --}}
                    @else
                    <button wire:click="previousPage" aria-label="Previous" wire:click="previousPage" id="prev">
                        <a>
                            <
                        </a>
                    </button>
                    @endif
                </li>

                @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                    @if (is_string($element))
                        <li aria-disabled="true">
                            <a>{{ $element }}</a>
                        </li>
                    @endif

                    @if (is_array($element))
                        @foreach ($element as $page => $url)
                            @if ($page == $paginator->currentPage())
                                <li class="active" id="page-{{ $page }}-current">
                                    <a>{{ $page }}</a>
                                </li>
                            @else
                                <li id="page-{{ $page }}" class="cursor-pointer">
                                    <a wire:click="gotoPage({{ $page }})">{{ $page }}</a>
                                </li>
                            @endif
                        @endforeach
                    @endif

                @endforeach

                <li class="pager">
                    @if ($paginator->hasMorePages())
                        <button aria-label="Next" wire:click="nextPage">
                            <a>></a>
                        </button>
                    @else
                        {{-- <button aria-label="Next">
                            <a>></a>
                        </button> --}}
                    @endif
                </li>
            </ul>
        </nav>
    </div>
</div>
@endif

@push('css')
    <link href="{{ asset('assets') }}/css/datatable.css" rel="stylesheet" />
@endpush