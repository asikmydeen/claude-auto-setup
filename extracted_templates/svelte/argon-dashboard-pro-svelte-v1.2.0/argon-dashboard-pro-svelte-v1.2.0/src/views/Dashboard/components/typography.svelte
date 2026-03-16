<script>
  import BaseHeader from "../../../components/BaseHeader.svelte";
  import RouteBreadcrumb from "../../../components/Breadcrumb/RouteBreadcrumb.svelte";
  import BaseButton from "../../../components/BaseButton.svelte";
  import Card from "../../../components/Cards/Card.svelte";
  import { fade } from "svelte/transition";
  export let name = "Typography";
  import { onMount } from "svelte";
  onMount(function() {
    let topmenu = document.getElementsByTagName("nav").item(0);
    topmenu.classList.add("bg-danger");
    topmenu.classList.add("navbar-dark");
    topmenu.classList.remove("navbar-light");
    let search = document.getElementsByTagName("form").item(0);
    search.classList.remove("navbar-search-dark");
    search.classList.add("navbar-search-light");
  });
</script>

<div style="transform-origin: center top;" transition:fade={{ duration: 250 }}>
  <BaseHeader className="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <h6 class="h2 text-white d-inline-block mb-0">{name}</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <RouteBreadcrumb {name} />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <BaseButton size="sm" type="neutral">New</BaseButton>
        <BaseButton size="sm" type="neutral">Filters</BaseButton>
      </div>
    </div>
  </BaseHeader>

  <div class="container-fluid mt--6">
    <div class="row justify-content-center">
      <div class="col-lg-8 card-wrapper">
        <!-- Headings -->
        <Card>
          <h3 slot="header" class="mb-0">Headings</h3>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 1
              </small>
            </div>
            <div class="col-sm-9">
              <h1 class="mb-0">Argon Dashboard PRO</h1>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 2
              </small>
            </div>
            <div class="col-sm-9">
              <h2 class="mb-0">Argon Dashboard PRO</h2>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 3
              </small>
            </div>
            <div class="col-sm-9">
              <h3 class="mb-0">Argon Dashboard PRO</h3>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 4
              </small>
            </div>
            <div class="col-sm-9">
              <h4 class="mb-0">Argon Dashboard PRO</h4>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 5
              </small>
            </div>
            <div class="col-sm-9">
              <h5 class="mb-0">Argon Dashboard PRO</h5>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading 6
              </small>
            </div>
            <div class="col-sm-9">
              <h6 class="mb-0">Argon Dashboard PRO</h6>
            </div>
          </div>
        </Card>
        <!-- Display titles -->
        <Card>
          <h3 slot="header" class="mb-0">Display titles</h3>

          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Display 1
              </small>
            </div>
            <div class="col-sm-9">
              <h1 class="display-1 mb-0">Argon Dashboard PRO</h1>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Display 2
              </small>
            </div>
            <div class="col-sm-9">
              <h1 class="display-2 mb-0">Argon Dashboard PRO</h1>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Display 3
              </small>
            </div>
            <div class="col-sm-9">
              <h1 class="display-3 mb-0">Argon Dashboard PRO</h1>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Display 4
              </small>
            </div>
            <div class="col-sm-9">
              <h1 class="display-4 mb-0">Argon Dashboard PRO</h1>
            </div>
          </div>
        </Card>
        <!-- Specialized titles -->
        <Card>
          <h3 slot="header" class="mb-0">Specialized titles</h3>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading
              </small>
            </div>
            <div class="col-sm-9">
              <h3 class="heading mb-0">Argon Dashboard PRO</h3>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading title
              </small>
            </div>
            <div class="col-sm-9">
              <h3 class="heading-title text-warning mb-0">
                Argon Dashboard PRO
              </h3>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Heading title
              </small>
            </div>
            <div class="col-sm-9">
              <div>
                <h2 class="display-3">Header with small subtitle</h2>
                <p class="lead text-muted">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record maximum.
                </p>
              </div>
            </div>
          </div>
        </Card>
        <!-- Paragraphs -->
        <Card>
          <h3 slot="header" class="mb-0">Paragraphs</h3>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Paragraph
              </small>
            </div>
            <div class="col-sm-9">
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Lead text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="lead">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Quote
              </small>
            </div>
            <div class="col-sm-9">
              <blockquote class="blockquote">
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer class="blockquote-footer">
                  Someone famous in
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Muted text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Primary text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-primary">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Info text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-info mb-0">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Success text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-success mb-0">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Warning text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-warning mb-0">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
          <div class="row align-items-center py-3">
            <div class="col-sm-3">
              <small class="text-uppercase text-muted font-weight-bold">
                Danger text
              </small>
            </div>
            <div class="col-sm-9">
              <p class="text-danger mb-0">
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers...
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
