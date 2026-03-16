<template>
  <div class="row">
    <div class="header text-center">
      <h3 class="title">Timeline</h3>
    </div>
    <div class="col-md-12">
      <time-line>
        <time-line-item
          inverted
          badge-type="danger"
          badge-icon="now-ui-icons business_briefcase-24"
        >
          <template v-slot:header>
            <span class="badge badge-danger">Some title</span>
          </template>

          <template v-slot:content>
            <p>
              Wifey made the best Father's Day meal ever. So thankful so happy
              so blessed. Thank you for making my family We just had fun with
              the “future” theme !!! It was a fun night all together ... The
              always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa
              and 12th in downtown.
            </p>
          </template>

          <template v-slot:footer>
            <h6>
              <i class="ti-time"></i>
              11 hours ago via Twitter
            </h6>
          </template>
        </time-line-item>

        <time-line-item
          badge-type="success"
          badge-icon="now-ui-icons design-2_ruler-pencil"
        >
          <template v-slot:header>
            <span class="badge badge-success">Another Title</span>
          </template>

          <template v-slot:content>
            <p>
              Thank God for the support of my wife and real friends. I also
              wanted to point out that it’s the first album to go number 1 off
              of streaming!!! I love you Ellen and also my number one design
              rule of anything I do from shoes to music to homes is that Kim has
              to like it....
            </p>
          </template>
        </time-line-item>

        <time-line-item
          inverted
          badge-type="info"
          badge-icon="now-ui-icons gestures_tap-01"
        >
          <template v-slot:header>
            <span class="badge badge-info">Another Title</span>
          </template>

          <template v-slot:content>
            <div>
              <p>
                Called I Miss the Old Kanye That’s all it was Kanye And I love
                you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in
                downtown LA 11:10PM
              </p>
              <p>
                What if Kanye made a song about Kanye Royère doesn't make a
                Polar bear bed but the Polar bear couch is my favorite piece of
                furniture we own It wasn’t any Kanyes Set on his goals Kanye
              </p>
              <hr />
            </div>
          </template>
          <template v-slot:footer>
            <span>
              <drop-down>
                <template v-slot:title>
                  <n-button type="info" round class="dropdown-toggle">
                    <i class="now-ui-icons design_bullet-list-67"></i>
                  </n-button>
                </template>

                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </drop-down>
            </span>
          </template>
        </time-line-item>

        <time-line-item
          badge-type="warning"
          badge-icon="now-ui-icons ui-1_send"
        >
          <template v-slot:header>
            <span class="badge badge-warning">Another Title</span>
          </template>

          <template v-slot:content>
            <p>
              Tune into Big Boy's 92.3 I'm about to play the first single from
              Cruel Winter Tune into Big Boy's 92.3 I'm about to play the first
              single from Cruel Winter also to Kim’s hair and makeup Lorraine
              jewelry and the whole style squad at Balmain and the Yeezy team.
              Thank you Anna for the invite thank you to the whole Vogue team
            </p>
          </template>
        </time-line-item>
      </time-line>
    </div>
  </div>
</template>
<script>
import { TimeLine, TimeLineItem } from "@/components";
export default {
  components: {
    TimeLine,
    TimeLineItem,
  },
};
</script>
<style></style>
