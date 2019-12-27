<template>
	<div>
		<el-row v-loading.fullscreen.lock="loading">
			<el-col :span="22" :offset="1" :lg="{ span: 16, offset: 4 }">
				<el-row >
					<el-col class="main-contain" :span="11" :lg="{ span: 9 }">
						<transition name="el-fade-in-linear" :appear="true">
							<el-card class="img-contain" :body-style="{padding: '0px'}">
								<el-image
								style="{ align-content: center; width: 100%;}"
								:preview-src-list="[itemInfo.image_path]" 
								:src="itemInfo.image_path" />
							</el-card>
						</transition>
					</el-col>
					<el-col :span="11" :lg="{ span: 13 }">
						<transition name="el-fade-in-linear" :appear="true">
							<el-card class="info-contain main-contain" :body-style="{ padding: '0px' }">
								<el-row class="msg-contain">
									<el-col>
										<h2 class="shop-name info-group">{{ itemInfo.name }}</h2>
										<p class="info-group">
											<span class="info-title">价格</span>
											<span class="red-normal">￥</span>
											<span class="red-normal price">{{ priceStringArr[0] }}</span>
											<span class="red-normal price">.</span>
											<span class="red-normal price">{{ priceStringArr[1] }}</span>
										</p>
										<p class="info-group">
											<span class="info-title">产地</span>
											<span>{{ itemInfo.address }}</span>
										</p>
										<p class="info-group">
											<span class="info-title">标签</span>
											<span v-for="(obj, index) in itemInfo.tags" :key="index">
												{{ obj }}<el-divider v-if="index != itemInfo.tags.length - 1" direction="vertical"/>
											</span>
										</p>
										<p class="info-group">
											<span class="info-title description">描述</span>
											<span class="description">{{ itemInfo.description }}</span>
										</p>
									</el-col>
								</el-row>
								<el-divider class="line" />
								<el-row class="action-contain">
									<el-col>
										<commodity-action v-model="itemInfo"/>
									</el-col>
								</el-row>
							</el-card>
						</transition>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import commodityApi from '../../../api/commodityApi.js';
import commodityAction from '../compoents/commodityAction.vue'

export default {
	props: ['item_id'],
	data() {
		return {
			itemInfo: {},
			loading: true
		};
	},
	components: {
		commodityAction
	},
	computed: {
		// 把价格小数点前后拆开
		priceStringArr() {
			return this.itemInfo.price.toString().split('.');
		}
	},
	methods: {
		// 获取商品信息
		getItemInfo: function() {
			let vm = this;
			vm.$axios({
				method: 'GET',
				url: commodityApi.itemInfo,
				params: {
					item_id: vm.item_id
				}
			})
				.then(r => {
					if (r.data.code == 200) {
						vm.itemInfo = { ...r.data.data };
					} else {
						vm.$notify({
							title: '加载失败',
							message: r.data.message ? r.data.message : '',
							type: 'error'
						})
					}
					vm.loading = false;
				})
				.catch(r => {
					vm.$notify({
						message: '获取商品信息失败',
						type: 'error'
					});
					vm.loading = false;
				});
		}
	},
	mounted() {
		this.getItemInfo();
	}
};
</script>

<style lang="stylus" scoped>
.my-banner
	background-color whitesmoke
	img
		width 100%
.main-contain
	margin 1.25rem
	h1, h2, p
		margin 0
		padding 0
	.red-normal
		color red
	.price
		font-size 2.1875rem
	.line
		margin 1.5rem 1.5rem
		width unset
	.info-title
		color gray
		margin-right 1.25rem
	.description
		display inline-block
		&:nth-child(2n)
			margin-top 0.9375rem
.info-contain
	background-color whitesmoke
	h1, h2, p
		padding 0.9375rem
	.msg-contain
		margin 1.25rem
	.action-contain
		margin 1.25rem 1.5rem
</style>
