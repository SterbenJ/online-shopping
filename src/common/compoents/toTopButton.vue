<template>
	<transition name="el-fade-in-linear" :appear="true">
		<div class="btn" color="primary" v-show="return_top_btn" @click="goTop">
			<el-button type="primary" circle>
				回到顶部
			</el-button>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ToTopButton',
	data() {
		return {
			return_top_btn: false,
			isTop: true,
			timer: null
		};
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll, true);
		this.needScroll();
	},
	methods: {
		handleScroll() {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var scroll = scrollTop - this.i;
			this.i = scrollTop;
			this.Top = scrollTop;
			if (scroll < 0) {
				this.return_top_btn = false;
			} else {
				this.return_top_btn = true;
			}
		},
		needScroll() {
			window.onscroll = function() {
				if (!this.isTop) {
					clearInterval(this.timer);
				}
				this.isTop = false;
			};
		},
		goTop() {
			this.timer = setInterval(() => {
				let osTop = document.documentElement.scrollTop || document.body.scrollTop;
				let ispeed = Math.floor(-osTop / 2);
				document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
				this.isTop = true;
				if (osTop === 0) {
					clearInterval(this.timer);
				}
			}, 30);
		}
	}
};
</script>

<style lang="stylus" scoped>
.btn
	position fixed
	right 2.5rem
	bottom 2.5rem
	.el-button
		box-shadow 0px 4px 5px #475669 
		width 5rem
		height 5rem
</style>
