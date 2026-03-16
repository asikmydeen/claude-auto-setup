<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <vnud-card>
          <template v-slot:header>
            <h4 class="card-title">
              Navigation Pills -
              <small class="description">Horizontal Tabs</small>
            </h4>
          </template>

          <tabs type="primary" v-model:value="tabs.horizontal">
            <tab-pane label="Profile">
              Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </tab-pane>
            <tab-pane label="Settings">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions
              without functional solutions.
            </tab-pane>
            <tab-pane label="Options">
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas.
              <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </tab-pane>
          </tabs>
        </vnud-card>
      </div>

      <div class="col-md-6">
        <vnud-card>
          <template v-slot:header>
            <h4 class="card-title">
              Navigation Pills -
              <small class="description">Vertical Tabs</small>
            </h4>
          </template>

          <tabs
            type="primary"
            vertical
            class="row"
            v-model:value="tabs.vertical"
          >
            <tab-pane label="Profile">
              Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </tab-pane>

            <tab-pane label="Settings">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions
              without functional solutions.
            </tab-pane>

            <tab-pane label="Options">
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas.
              <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </tab-pane>
          </tabs>
        </vnud-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <vnud-card>
          <collapse>
            <collapse-item title="Collapsible Group Item #1" id="0" active>
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div>
            </collapse-item>

            <collapse-item title="Collapsible Group Item #2" id="1">
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div>
            </collapse-item>

            <collapse-item title="Collapsible Group Item #3" id="2">
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven't heard of them accusamus labore sustainable VHS.
              </div>
            </collapse-item>
          </collapse>
        </vnud-card>
      </div>

      <div class="col-md-6">
        <vnud-card>
          <template v-slot:header>
            <h4 class="card-title">
              Navigation Pills Icons -
              <small class="description">Vertical Tabs</small>
            </h4>
          </template>

          <tabs
            type="primary"
            v-model:value="tabs.verticalPills"
            tabNavWrapperClasses="col-md-4"
            tabContentClasses="col-md-8"
            vertical
            square
            class="row"
          >
            <tab-pane label="Home" icon="now-ui-icons objects_umbrella-13">
              Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </tab-pane>

            <tab-pane label="Settings" icon="now-ui-icons ui-2_settings-90">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions
              without functional solutions.
            </tab-pane>
          </tabs>
        </vnud-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 ml-auto mr-auto">
        <vnud-card plain class="card-subcategories">
          <template v-slot:header>
            <h4 class="card-title text-center">Page Subcategories</h4>
            <br />
          </template>

          <tabs
            type="primary"
            v-model:value="tabs.pageCategories"
            tabContentClasses="tab-subcategories"
            square
            centered
            class="row"
          >
            <tab-pane label="Home" icon="now-ui-icons objects_umbrella-13">
              Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </tab-pane>

            <tab-pane label="Messages" icon="now-ui-icons shopping_shop">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions
              without functional solutions.
            </tab-pane>

            <tab-pane label="Settings" icon="now-ui-icons ui-2_settings-90">
              Completely synergize resource taxing relationships via premier
              niche markets. Professionally cultivate one-to-one customer
              service with robust ideas.
              <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </tab-pane>
          </tabs>
        </vnud-card>
      </div>
    </div>
  </div>
</template>
<script>
import { TabPane, Tabs, Collapse, CollapseItem } from "@/components";

export default {
  components: {
    TabPane,
    Tabs,
    Collapse,
    CollapseItem,
  },
  data() {
    return {
      activeName: "first",
      tabs: {
        horizontal: "Profile",
        vertical: "Options",
        verticalPills: "Home",
        pageCategories: "Messages",
      },
    };
  },
};
</script>
<style lang="scss"></style>
