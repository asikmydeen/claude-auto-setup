<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="card">
          <div class="card-header p-3 pb-0">
            <h6 class="mb-0">الأحداث القادمة</h6>
            <p class="text-sm mb-0 text-capitalize font-weight-bold">انضم</p>
          </div>
          <div class="card-body border-radius-lg px-3 py-1">
            <default-item
              class="mt-2"
              :icon="{ component: 'savings', color: 'dark' }"
              title="أسبوع الإنترنت"
              description="01 يونيو 2021, ي 12:30 PM"
            />
            <default-item
              class="mt-4"
              :icon="{ component: 'notifications_active', color: 'dark' }"
              title="لقاء مع ماري"
              description="24 مايو 2021, ي 10:00 PM"
            />
            <default-item
              class="mt-4"
              :icon="{ component: 'task', color: 'dark' }"
              title="تخطيط المهمة"
              description="25 مايو 2021, ي 10:00 PM"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-8 mt-lg-0 mt-4">
        <progress-line-chart
          id="progress-line-chart-rtl"
          title="مهام"
          :count="480"
          :progress="60"
          :chart="{
            labels: [
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            data: [40, 45, 42, 41, 40, 43, 40, 42, 39],
          }"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-3 col-sm-6">
        <mini-statistics-card
          class="p-0"
          :title="{
            text: 'صحة البطارية',
            color: 'opacity-7 text-gray',
          }"
          :value="{
            text: '99 %',
            color: 'text-dark',
          }"
          :icon="{
            component: 'battery_charging_full',
            background: 'bg-success',
          }"
          direction-reverse
        />
        <mini-statistics-card
          class="p-0"
          :title="{
            text: 'طبقة صوت الموسيقا',
            color: 'opacity-7 text-gray',
          }"
          :value="{
            text: '15/100',
            color: 'text-dark',
          }"
          :icon="{
            component: 'volume_up',
            background: 'bg-success',
          }"
          direction-reverse
        />
      </div>
      <div class="col-lg-5 col-sm-6 mt-sm-0 mt-4">
        <div class="row">
          <div class="col-md-6">
            <default-info-card
              icon="account_balance"
              title="مرتب"
              description="تنتمي التفاعلية"
              value="+$2000"
            />
          </div>
          <div class="col-md-6">
            <default-info-card
              icon="account_balance_wallet"
              title="باي بال"
              description="دفع لحسابهم الخاص"
              value="$455.00"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <master-card
          :card="{
            holderText: 'حامل البطاقة',
            expiryText: 'نتهي',
            number: '4562   1122   4594   7852',
            holderName: 'جاك بيترسون',
            expiryDate: '11/22',
            background: 'dark',
          }"
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-3 col-md-6">
        <info-card
          title="جسم كامل"
          description="ما يهم هو الأشخاص الذين أوقدوه. والناس الذين يشبهونهم مستاءون منه."
          :badge="{ text: 'معتدل', color: 'success' }"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <controller-card
          controller-is="على"
          :image="{
            url: bulbIcon,
            alt: 'علی',
            label: 'درجة حرارة',
          }"
        />
      </div>
      <div class="col-lg-3">
        <line-chart
          id="line-chart"
          title="سعرات حراريه"
          :value="{
            amount: '97',
            percentage: { value: '+5%', color: 'success' },
          }"
          :chart="{
            labels: [
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            datasets: {
              label: 'Income',
              data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
            },
          }"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <mini-info-card
          icon="refresh"
          color="success"
          title="754
        <span class='text-sm text-secondary'>م</span>"
          description="مدينة نيويورك"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <steps-card
          title="خطوات"
          count="11.4ک"
          :badge="{ label: '+4.3%', color: 'success' }"
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-5">
        <calendar title="تقویم" class="h-100" />
      </div>
      <div class="mt-0 col-lg-3">
        <categories-list
          title="فئات"
          :items="[
            {
              icon: { component: 'launch', background: 'dark' },
              title: 'الأجهزة',
              description: '250 في المخزن, <strong>346+ تم البيع</strong>',
            },

            {
              icon: { component: 'book_online', background: 'dark' },
              title: 'تذاكر',
              description: '123 مغلق, <strong>15 افتح البيع</strong>',
            },

            {
              icon: { component: 'priority_high', background: 'dark' },
              title: 'سجلات الخطأ',
              description: ' is نشيط, <strong>40 مغلق</strong>',
            },
            {
              icon: { component: 'insert_emoticon', background: 'dark' },
              title: 'المستخدمين السعداء',
              description: '+ 430',
            },
          ]"
        />
        <music-player :song="{ title: 'نوع من البلوز', singer: 'ديفتونز' }" />
      </div>
      <div class="col-lg-4">
        <timeline-list
          class="h-100"
          title="نظرة عامة على الطلبات"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>24%</span>هذا الشهر"
        >
          <timeline-item
            :icon="{
              component: 'notifications',
              class: 'text-success',
            }"
            title="$2400, تغييرات في التصميم"
            date-time="22 ديسمبر 7:20 مساءً"
          />
          <TimelineItem
            :icon="{
              component: 'code',
              class: 'text-danger',
            }"
            title="طلب جديد # 1832412"
            date-time="21 ديسمبر 11 م"
          />
          <TimelineItem
            :icon="{
              component: 'shopping_cart',
              class: 'text-info',
            }"
            title="مدفوعات الخادم لشهر أبريل"
            date-time="21 ديسمبر 9:34 مساءً"
          />
          <TimelineItem
            :icon="{
              component: 'credit_card',
              class: 'text-warning',
            }"
            title="تمت إضافة بطاقة جديدة للأمر رقم 4395133"
            date-time="20 ديسمبر 2:20 صباحًا"
          />
          <TimelineItem
            :icon="{
              component: 'vpn_key',
              class: 'text-primary',
            }"
            title="فتح الحزم من أجل التطوير"
            date-time="18 ديسمبر ، 4:54 صباحًا"
          />
          <TimelineItem
            :icon="{
              component: 'bug_report',
              class: 'text-dark',
            }"
            title="طلب جديد # 9583120"
            date-time="17 ديسمبر"
          />
        </timeline-list>
      </div>
    </div>
  </div>
</template>

<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ProgressLineChart from "./components/ProgressLineChart.vue";
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import MasterCard from "@/examples/Cards/MasterCard.vue";
import LineChart from "./components/LineChart.vue";
import DefaultItem from "./components/DefaultItem.vue";
import InfoCard from "./components/InfoCard.vue";
import ControllerCard from "./components/ControllerCard.vue";
import MiniInfoCard from "./components/MiniInfoCard.vue";
import StepsCard from "./components/StepsCard.vue";
import Calendar from "@/examples/Calendar.vue";
import CategoriesList from "@/examples/Cards/CategoriesList.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import bulbIcon from "@/assets/img/small-logos/icon-bulb.svg";

export default {
  name: "RtlPage",
  components: {
    MiniStatisticsCard,
    ProgressLineChart,
    DefaultInfoCard,
    MasterCard,
    LineChart,
    DefaultItem,
    InfoCard,
    ControllerCard,
    MiniInfoCard,
    StepsCard,
    Calendar,
    CategoriesList,
    TimelineList,
    TimelineItem,
    MusicPlayer,
  },
  data() {
    return { bulbIcon };
  },
  beforeMount() {
    this.$store.state.isRTL = true;
    document.querySelector("html").setAttribute("lang", "ar");
    document.querySelector("html").setAttribute("dir", "rtl");
    document.querySelector("#app").classList.add("rtl");
  },
  beforeUnmount() {
    this.$store.state.isRTL = false;
    document.querySelector("html").removeAttribute("lang");
    document.querySelector("html").removeAttribute("dir");
    document.querySelector("#app").classList.remove("rtl");
  },
};
</script>
