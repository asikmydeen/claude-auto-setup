<script>
  import Card from "../../components/Cards/Card.svelte";
  import BaseButton from "../../components/BaseButton.svelte";
  document.body.classList = "bg-default";
  import { fade, scale } from "svelte/transition";
</script>

<div in:scale={{ y: 200, duration: 500 }} out:scale={{ y: 200, duration: 100 }}>
  <div class="header bg-gradient-danger py-7 py-lg-8 pt-lg-9">
    <div class="container">
      <div class="header-body text-center mb-7">
        <div class="row justify-content-center">
          <div class="px-5 col-md-8 col-lg-6 col-xl-5">
            <h1 class="text-white">Choose the best plan for your business</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="separator separator-bottom separator-skew zindex-100">
      <svg
        x="0"
        y="0"
        viewBox="0 0 2560 100"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <polygon points="2560 0 2560 100 0 100" class="fill-default" />
      </svg>
    </div>
  </div>
  <div class="mt--8 pb-5 container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="pricing flex-column flex-md-row mb-3 card-group">
          <Card
            className="card card-pricing border-0 text-center mb-4"
            headerClasses="bg-transparent"
            bodyClasses="px-lg-7"
            footerClasses="bg-transparent">

            <h4
              slot="header"
              class="header text-uppercase ls-1 text-primary py-3 mb-0">
              Bravo pack
            </h4>
            <div class="display-2">$49</div>
            <span class="text-muted">per application</span>
            <ul class="list-unstyled my-4">
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-gradient-primary shadow
                      rounded-circle text-white">
                      <i class="fas fa-terminal" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2">Complete documentation</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-gradient-primary shadow
                      rounded-circle text-white">
                      <i class="fas fa-pen-fancy" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2">Working materials in Sketch</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-gradient-primary shadow
                      rounded-circle text-white">
                      <i class="fas fa-hdd" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2">2GB cloud storage</span>
                  </div>
                </div>
              </li>
            </ul>
            <BaseButton type="primary" className="mb-3">
              Start free trial
            </BaseButton>
            <a slot="footer" href="#!" class="text-light">Request a demo</a>
          </Card>
          <Card
            className="card card-pricing zoom-in shadow-lg rounded border-0
            text-center mb-4 bg-gradient-info"
            gradient="info"
            headerClasses="bg-transparent"
            bodyClasses="px-lg-7"
            footerClasses="bg-transparent">

            <h4 slot="header" class="text-uppercase ls-1 text-white py-3 mb-0">
              Alpha pack
            </h4>
            <div class="display-1 text-white">$199</div>
            <span class="text-white">per application</span>
            <ul class="list-unstyled my-4">
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-white shadow
                      rounded-circle text-muted">
                      <i class="fas fa-terminal" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-white">Complete documentation</span>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-white shadow
                      rounded-circle text-muted">
                      <i class="fas fa-pen-fancy" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-white">
                      Working materials in Sketch
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div class="d-flex align-items-center">
                  <div>
                    <div
                      class="icon icon-xs icon-shape bg-white shadow
                      rounded-circle text-muted">
                      <i class="fas fa-hdd" />
                    </div>
                  </div>
                  <div>
                    <span class="pl-2 text-white">2GB cloud storage</span>
                  </div>
                </div>
              </li>
            </ul>
            <BaseButton type="secondary" size="lg" className="mb-3">
              Start free trial
            </BaseButton>

            <a slot="footer" href="#!" class="text-white">Contact sales</a>
          </Card>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-lg-center px-3 mt-5">
      <div>
        <div
          class="icon icon-shape bg-gradient-white shadow rounded-circle
          text-primary">
          <i class="ni ni-building text-primary" />
        </div>
      </div>
      <div class="col-lg-6">
        <p class="text-white">
          <strong>The Arctic Ocean</strong>
          freezes every winter and much of the sea-ice then thaws every summer,
          and that process will continue whatever..
        </p>
      </div>
    </div>
    <div class="row row-grid justify-content-center">
      <div class="col-lg-10">
        <div class="table-responsive">
          <table class="table tablesorter table table-dark mt-5">
            <thead class="">
              <tr>
                <th scope="col" class="px-0 bg-transparent">
                  <span class="text-light font-weight-700">Features</span>
                </th>
                <th scope="col" class="text-center bg-transparent">
                  Bravo Pack
                </th>
                <th scope="col" class="text-center bg-transparent">
                  Alpha Pack
                </th>
              </tr>
            </thead>
            <tbody class="">
              <tr>
                <td class="px-0">IMAP/POP Support</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
              </tr>
              <tr>
                <td class="px-0">Email Forwarding</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
              </tr>
              <tr>
                <td class="px-0">Active Sync</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
              </tr>
              <tr>
                <td class="px-0">Multiple domain hosting</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">
                  <span class="text-sm text-light">
                    Limited to 1 domain only
                  </span>
                </td>
              </tr>
              <tr>
                <td class="px-0">Additional storage upgrade</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
              </tr>
              <tr>
                <td class="px-0">30MB Attachment Limit</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">-</td>
              </tr>
              <tr>
                <td class="px-0">Password protected / Expiry links</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">-</td>
              </tr>
              <tr>
                <td class="px-0">Unlimited Custom Apps</td>
                <td class="text-center">
                  <i class="fas fa-check text-success" />
                </td>
                <td class="text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
