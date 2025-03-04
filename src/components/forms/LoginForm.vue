<template>
    <form @p.prevent class="form-signin">
			<a href="/">
				<img
					class="mb-4"
					src="/img/BSU_logo.svg"
					alt=""
					width="72"
					height="72"
				/>
			</a>
			<h1 class="h3 mb-3 font-weight-normal">
				Пожалуйста, войдите в личный кабинет
			</h1>
			<label
				for="inputEmail"
				class="sr-only"
				>Ваш e-mail</label
			>
			<input
				type="email"
				id="inputEmail"
				class="form-control mt-1"
				placeholder="E-mail"
				required=""
				autofocus=""
                :value="props.login"
                @input="$event => $emit('update:login', $event.target.value)"
			/>
			<label
				for="inputPassword"
				class="sr-only mt-3"
				>Пароль</label
			>
			<input
				type="password"
				id="inputPassword"
				class="form-control mt-1"
				placeholder="Пароль"
				required=""
                @input="$event => $emit('update:password', $event.target.value)"
			/>
			<div class="checkbox mb-3">
				<label>
					<input
						type="checkbox"
						value="remember-me"
					/>
					Запомнить меня
				</label>
			</div>
			<button
				class="btn btn-lg btn-primary btn-block"
				type="submit"
                @click="sendData"
			>
				Войти
			</button>
			<p class="mt-5 mb-3 text-muted">{{ currentYear }} Мы будущее ИТ Бурятии</p>
		</form>
</template>

<script setup>
    const props = defineProps({
        login: String,
        password: String
    })

    const $emit = defineEmits(['update:login', 'update:password', 'sendData'])

    const currentYear = new Date().getFullYear()

    function sendData(event) {
        event.preventDefault()
        $emit('sendData')
    }
</script>